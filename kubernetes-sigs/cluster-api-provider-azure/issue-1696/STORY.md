https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696

TODO

- Setup dev environment [DONE]
- Check how to run tests
- Check how to run particular tests related to resource groups alone
- Write a failing test for the issue - existing managed azure resource group and then update resource group tags should update tags
- Run the written test and ensure it fails for the proper reason
- Fix the issue with code
- Run the written test and check if it passes
- Checkout the different properties of a resource group other than tags in the K8s resource spec and in the Azure cloud. Can the other properties be updated? Should that also be managed by the CAPZ controller?

---

Looking at some of the yamls in the codebase, there is no K8s custom resource for Azure resource group I guess. I did notice a resource group field in `AzureCluster` custom resource in `templates/test/dev/cluster-template-custom-builds.yaml`

```yaml
apiVersion: infrastructure.cluster.x-k8s.io/v1alpha4
kind: AzureCluster
metadata:
  name: ${CLUSTER_NAME}
  namespace: default
spec:
  additionalTags:
    buildProvenance: ${BUILD_PROVENANCE}
    creationTimestamp: ${TIMESTAMP}
    jobName: ${JOB_NAME}
  identityRef:
    apiVersion: infrastructure.cluster.x-k8s.io/v1alpha4
    kind: AzureClusterIdentity
    name: ${CLUSTER_IDENTITY_NAME}
  location: ${AZURE_LOCATION}
  networkSpec:
    vnet:
      name: ${AZURE_VNET_NAME:=${CLUSTER_NAME}-vnet}
  resourceGroup: ${AZURE_RESOURCE_GROUP:=${CLUSTER_NAME}}
  subscriptionID: ${AZURE_SUBSCRIPTION_ID}
```

Searching for `resourceGroup: ` or `ResourceGroup: ` gives a lot of data around the different parts of the code, markdown files, yaml files, golang code

I couldn't find any file named resource group

```bash
cluster-api-provider-azure $ fd resource
azure/services/resourceskus
azure/services/resourceskus/mock_resourceskus
azure/services/resourceskus/mock_resourceskus/resourceskus_mock.go
docs/proposals/20210716-async-azure-resource-creation-deletion.md
hack/observability/jaeger/fetch-jaeger-resources.sh
hack/observability/opentelemetry/fetch-otel-resources.sh
hack/observability/prometheus/fetch-prometheus-resources.sh
hack/observability/prometheus/resources
templates/addons/calico-resource-set.yaml
templates/addons/flannel-resource-set.yaml
templates/flavors/external-cloud-provider/ccm-resource-set.yaml
templates/flavors/nvidia-gpu/gpu-operator-resources-set.yaml
templates/test/ci/prow/cni-resource-set.yaml
templates/test/ci/prow-windows/cni-resource-set-windows.yaml
cluster-api-provider-azure $
```

I could start from the `main.go` I guess and find the controller code and find where resource groups get created. Most probably when Azure Cluster custom resource is created since it has the resource group field, I also noticed some tests around resource groups in Azure Cluster related tests

`TestResourceGroupDefault` in `api/v1alpha4/azurecluster_default_test.go`

`TestNetworkSpecWithPreexistingVnetInvalidResourceGroup`, `TestResourceGroupValid`, `TestResourceGroupInvalid` in `api/v1alpha4/azurecluster_validation_test.go`

`TestAzureCluster_ValidateCreate`, `TestAzureCluster_ValidateUpdate` in `api/v1alpha4/azurecluster_webhook_test.go`

Looks like - given a resource group in a azure cluster, once it's given or created (not sure which one or if both), then it cannot be mutated later. There's a test for that in `api/v1alpha4/azurecluster_webhook_test.go`

```go
func TestAzureCluster_ValidateUpdate(t *testing.T) {
...
{
    name: "azurecluster resource group is immutable",
    oldCluster: &AzureCluster{
        Spec: AzureClusterSpec{
            ResourceGroup: "demoResourceGroup",
        },
    },
    cluster: &AzureCluster{
        Spec: AzureClusterSpec{
            ResourceGroup: "demoResourceGroup-2",
        },
    },
    wantErr: true,
}
...
}
```

[Question] where are the tags? What are these tags? Since there is no resource group custom resource. So, the tags for it should come from somewhere. The Azure cluster resource? Gotta check

There's a mention about network security groups in the issue https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issue-999600965

```
Someone working on this issue might want to take a look at how network security groups look at existing rules and only update them if some are missing, and use an etag to make sure there is no race with others also updating the NSG from other controllers: https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/7a76e16a66d2953bc9467a19e952c5b4b27ee1d9/azure/services/securitygroups/spec.go#L63
```

https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/7a76e16a66d2953bc9467a19e952c5b4b27ee1d9/azure/services/securitygroups/spec.go#L63

---

I'm reading the CONTRIBUTING.md file now. On the side I ran tests using the simple go command

```bash
cluster-api-provider-azure $ go test -v ./...
?   	sigs.k8s.io/cluster-api-provider-azure	[no test files]
=== RUN   TestFuzzyConversion
=== RUN   TestFuzzyConversion/for_AzureCluster
=== RUN   TestFuzzyConversion/for_AzureCluster/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureCluster/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureMachine
=== RUN   TestFuzzyConversion/for_AzureMachine/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureMachine/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureMachineTemplate
=== RUN   TestFuzzyConversion/for_AzureMachineTemplate/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureMachineTemplate/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureClusterIdentity
=== RUN   TestFuzzyConversion/for_AzureClusterIdentity/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureClusterIdentity/hub-spoke-hub
--- PASS: TestFuzzyConversion (22.89s)
    --- PASS: TestFuzzyConversion/for_AzureCluster (10.95s)
        --- PASS: TestFuzzyConversion/for_AzureCluster/spoke-hub-spoke (4.58s)
        --- PASS: TestFuzzyConversion/for_AzureCluster/hub-spoke-hub (6.37s)
    --- PASS: TestFuzzyConversion/for_AzureMachine (5.13s)
        --- PASS: TestFuzzyConversion/for_AzureMachine/spoke-hub-spoke (2.01s)
        --- PASS: TestFuzzyConversion/for_AzureMachine/hub-spoke-hub (3.13s)
    --- PASS: TestFuzzyConversion/for_AzureMachineTemplate (4.19s)
        --- PASS: TestFuzzyConversion/for_AzureMachineTemplate/spoke-hub-spoke (1.61s)
        --- PASS: TestFuzzyConversion/for_AzureMachineTemplate/hub-spoke-hub (2.58s)
    --- PASS: TestFuzzyConversion/for_AzureClusterIdentity (2.62s)
        --- PASS: TestFuzzyConversion/for_AzureClusterIdentity/spoke-hub-spoke (0.98s)
        --- PASS: TestFuzzyConversion/for_AzureClusterIdentity/hub-spoke-hub (1.65s)
=== RUN   TestTags_Merge
=== RUN   TestTags_Merge/nil_other
=== PAUSE TestTags_Merge/nil_other
=== RUN   TestTags_Merge/empty_other
=== PAUSE TestTags_Merge/empty_other
=== RUN   TestTags_Merge/disjoint
=== PAUSE TestTags_Merge/disjoint
=== RUN   TestTags_Merge/overlapping,_other_wins
=== PAUSE TestTags_Merge/overlapping,_other_wins
=== CONT  TestTags_Merge/nil_other
=== CONT  TestTags_Merge/disjoint
=== CONT  TestTags_Merge/overlapping,_other_wins
=== CONT  TestTags_Merge/empty_other
--- PASS: TestTags_Merge (0.00s)
    --- PASS: TestTags_Merge/nil_other (0.00s)
    --- PASS: TestTags_Merge/overlapping,_other_wins (0.00s)
    --- PASS: TestTags_Merge/disjoint (0.00s)
    --- PASS: TestTags_Merge/empty_other (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha3	25.335s
=== RUN   TestResourceGroupDefault
=== RUN   TestResourceGroupDefault/don't_change_if_mismatched
=== PAUSE TestResourceGroupDefault/don't_change_if_mismatched
=== RUN   TestResourceGroupDefault/default_empty_rg
=== PAUSE TestResourceGroupDefault/default_empty_rg
=== CONT  TestResourceGroupDefault/don't_change_if_mismatched
=== CONT  TestResourceGroupDefault/default_empty_rg
--- PASS: TestResourceGroupDefault (0.00s)
    --- PASS: TestResourceGroupDefault/default_empty_rg (0.00s)
    --- PASS: TestResourceGroupDefault/don't_change_if_mismatched (0.00s)
=== RUN   TestVnetDefaults
=== RUN   TestVnetDefaults/resource_group_vnet_specified
=== PAUSE TestVnetDefaults/resource_group_vnet_specified
=== RUN   TestVnetDefaults/vnet_not_specified
=== PAUSE TestVnetDefaults/vnet_not_specified
=== RUN   TestVnetDefaults/custom_CIDR
=== PAUSE TestVnetDefaults/custom_CIDR
=== RUN   TestVnetDefaults/IPv6_enabled
=== PAUSE TestVnetDefaults/IPv6_enabled
=== CONT  TestVnetDefaults/resource_group_vnet_specified
=== CONT  TestVnetDefaults/custom_CIDR
=== CONT  TestVnetDefaults/vnet_not_specified
=== CONT  TestVnetDefaults/IPv6_enabled
--- PASS: TestVnetDefaults (0.00s)
    --- PASS: TestVnetDefaults/resource_group_vnet_specified (0.00s)
    --- PASS: TestVnetDefaults/custom_CIDR (0.00s)
    --- PASS: TestVnetDefaults/vnet_not_specified (0.00s)
    --- PASS: TestVnetDefaults/IPv6_enabled (0.00s)
=== RUN   TestSubnetDefaults
=== RUN   TestSubnetDefaults/no_subnets
=== PAUSE TestSubnetDefaults/no_subnets
=== RUN   TestSubnetDefaults/subnets_with_custom_attributes
=== PAUSE TestSubnetDefaults/subnets_with_custom_attributes
=== RUN   TestSubnetDefaults/subnets_specified
=== PAUSE TestSubnetDefaults/subnets_specified
=== RUN   TestSubnetDefaults/subnets_route_tables_specified
=== PAUSE TestSubnetDefaults/subnets_route_tables_specified
=== RUN   TestSubnetDefaults/only_node_subnet_specified
=== PAUSE TestSubnetDefaults/only_node_subnet_specified
=== RUN   TestSubnetDefaults/subnets_specified_with_IPv6_enabled
=== PAUSE TestSubnetDefaults/subnets_specified_with_IPv6_enabled
=== RUN   TestSubnetDefaults/subnets_with_custom_security_group
=== PAUSE TestSubnetDefaults/subnets_with_custom_security_group
=== CONT  TestSubnetDefaults/no_subnets
=== CONT  TestSubnetDefaults/subnets_specified_with_IPv6_enabled
=== CONT  TestSubnetDefaults/subnets_with_custom_attributes
=== CONT  TestSubnetDefaults/subnets_with_custom_security_group
=== CONT  TestSubnetDefaults/subnets_route_tables_specified
=== CONT  TestSubnetDefaults/subnets_specified
=== CONT  TestSubnetDefaults/only_node_subnet_specified
--- PASS: TestSubnetDefaults (0.00s)
    --- PASS: TestSubnetDefaults/no_subnets (0.00s)
    --- PASS: TestSubnetDefaults/subnets_with_custom_attributes (0.00s)
    --- PASS: TestSubnetDefaults/subnets_specified_with_IPv6_enabled (0.00s)
    --- PASS: TestSubnetDefaults/subnets_with_custom_security_group (0.00s)
    --- PASS: TestSubnetDefaults/subnets_route_tables_specified (0.00s)
    --- PASS: TestSubnetDefaults/subnets_specified (0.00s)
    --- PASS: TestSubnetDefaults/only_node_subnet_specified (0.00s)
=== RUN   TestAPIServerLBDefaults
=== RUN   TestAPIServerLBDefaults/no_lb
=== PAUSE TestAPIServerLBDefaults/no_lb
=== RUN   TestAPIServerLBDefaults/internal_lb
=== PAUSE TestAPIServerLBDefaults/internal_lb
=== CONT  TestAPIServerLBDefaults/no_lb
=== CONT  TestAPIServerLBDefaults/internal_lb
--- PASS: TestAPIServerLBDefaults (0.00s)
    --- PASS: TestAPIServerLBDefaults/no_lb (0.00s)
    --- PASS: TestAPIServerLBDefaults/internal_lb (0.00s)
=== RUN   TestAzureEnviromentDefault
=== RUN   TestAzureEnviromentDefault/default_empty_azure_env
=== PAUSE TestAzureEnviromentDefault/default_empty_azure_env
=== RUN   TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud
=== PAUSE TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud
=== RUN   TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud
=== PAUSE TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud
=== CONT  TestAzureEnviromentDefault/default_empty_azure_env
=== CONT  TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud
=== CONT  TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud
--- PASS: TestAzureEnviromentDefault (0.00s)
    --- PASS: TestAzureEnviromentDefault/default_empty_azure_env (0.00s)
    --- PASS: TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud (0.00s)
    --- PASS: TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud (0.00s)
=== RUN   TestNodeOutboundLBDefaults
=== RUN   TestNodeOutboundLBDefaults/default_lb_for_public_clusters
=== PAUSE TestNodeOutboundLBDefaults/default_lb_for_public_clusters
=== RUN   TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB
=== PAUSE TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB
=== RUN   TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets
=== PAUSE TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets
=== RUN   TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them
=== PAUSE TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them
=== RUN   TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them
=== PAUSE TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them
=== RUN   TestNodeOutboundLBDefaults/no_lb_for_private_clusters
=== PAUSE TestNodeOutboundLBDefaults/no_lb_for_private_clusters
=== RUN   TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values
=== PAUSE TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values
=== CONT  TestNodeOutboundLBDefaults/default_lb_for_public_clusters
=== CONT  TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them
=== CONT  TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets
=== CONT  TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values
=== CONT  TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB
=== CONT  TestNodeOutboundLBDefaults/no_lb_for_private_clusters
=== CONT  TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them
--- PASS: TestNodeOutboundLBDefaults (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/default_lb_for_public_clusters (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/no_lb_for_private_clusters (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them (0.00s)
=== RUN   TestControlPlaneOutboundLBDefaults
=== RUN   TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters
=== PAUSE TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters
=== RUN   TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters
=== PAUSE TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters
=== RUN   TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1
=== PAUSE TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1
=== CONT  TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters
=== CONT  TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1
=== CONT  TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters
--- PASS: TestControlPlaneOutboundLBDefaults (0.00s)
    --- PASS: TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters (0.00s)
    --- PASS: TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1 (0.00s)
    --- PASS: TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters (0.00s)
=== RUN   TestBastionDefault
=== RUN   TestBastionDefault/azure_bastion_enabled_with_name_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_name_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set
=== RUN   TestBastionDefault/no_bastion_set
=== PAUSE TestBastionDefault/no_bastion_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_no_settings
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_no_settings
=== CONT  TestBastionDefault/azure_bastion_enabled_with_name_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_no_settings
=== CONT  TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set
=== CONT  TestBastionDefault/no_bastion_set
--- PASS: TestBastionDefault (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_name_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_no_settings (0.00s)
    --- PASS: TestBastionDefault/no_bastion_set (0.00s)
=== RUN   TestClusterNameValidation
=== RUN   TestClusterNameValidation/cluster_name_more_than_44_characters
=== RUN   TestClusterNameValidation/cluster_name_with_letters
=== RUN   TestClusterNameValidation/cluster_name_with_upper_case_letters
=== RUN   TestClusterNameValidation/cluster_name_with_hyphen
=== RUN   TestClusterNameValidation/cluster_name_with_letters_and_numbers
=== RUN   TestClusterNameValidation/cluster_name_with_special_characters
=== RUN   TestClusterNameValidation/cluster_name_starting_with_underscore
=== RUN   TestClusterNameValidation/cluster_name_starting_with_number
=== RUN   TestClusterNameValidation/cluster_name_with_underscore
=== RUN   TestClusterNameValidation/cluster_name_with_period
--- PASS: TestClusterNameValidation (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_more_than_44_characters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_letters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_upper_case_letters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_hyphen (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_letters_and_numbers (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_special_characters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_starting_with_underscore (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_starting_with_number (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_underscore (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_period (0.00s)
=== RUN   TestClusterWithPreexistingVnetValid
=== RUN   TestClusterWithPreexistingVnetValid/azurecluster_with_pre-existing_vnet_-_valid
--- PASS: TestClusterWithPreexistingVnetValid (0.00s)
    --- PASS: TestClusterWithPreexistingVnetValid/azurecluster_with_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestClusterWithPreexistingVnetInvalid
=== RUN   TestClusterWithPreexistingVnetInvalid/azurecluster_with_pre-existing_vnet_-_invalid
--- PASS: TestClusterWithPreexistingVnetInvalid (0.00s)
    --- PASS: TestClusterWithPreexistingVnetInvalid/azurecluster_with_pre-existing_vnet_-_invalid (0.00s)
=== RUN   TestClusterWithoutPreexistingVnetValid
=== RUN   TestClusterWithoutPreexistingVnetValid/azurecluster_without_pre-existing_vnet_-_valid
--- PASS: TestClusterWithoutPreexistingVnetValid (0.00s)
    --- PASS: TestClusterWithoutPreexistingVnetValid/azurecluster_without_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestClusterSpecWithPreexistingVnetValid
=== RUN   TestClusterSpecWithPreexistingVnetValid/azurecluster_spec_with_pre-existing_vnet_-_valid
--- PASS: TestClusterSpecWithPreexistingVnetValid (0.00s)
    --- PASS: TestClusterSpecWithPreexistingVnetValid/azurecluster_spec_with_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestClusterSpecWithPreexistingVnetInvalid
=== RUN   TestClusterSpecWithPreexistingVnetInvalid/azurecluster_spec_with_pre-existing_vnet_-_invalid
--- PASS: TestClusterSpecWithPreexistingVnetInvalid (0.00s)
    --- PASS: TestClusterSpecWithPreexistingVnetInvalid/azurecluster_spec_with_pre-existing_vnet_-_invalid (0.00s)
=== RUN   TestClusterSpecWithoutPreexistingVnetValid
=== RUN   TestClusterSpecWithoutPreexistingVnetValid/azurecluster_spec_without_pre-existing_vnet_-_valid
--- PASS: TestClusterSpecWithoutPreexistingVnetValid (0.00s)
    --- PASS: TestClusterSpecWithoutPreexistingVnetValid/azurecluster_spec_without_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestNetworkSpecWithPreexistingVnetValid
=== RUN   TestNetworkSpecWithPreexistingVnetValid/azurecluster_networkspec_with_pre-existing_vnet_-_valid
--- PASS: TestNetworkSpecWithPreexistingVnetValid (0.00s)
    --- PASS: TestNetworkSpecWithPreexistingVnetValid/azurecluster_networkspec_with_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestNetworkSpecWithPreexistingVnetLackRequiredSubnets
=== RUN   TestNetworkSpecWithPreexistingVnetLackRequiredSubnets/azurecluster_networkspec_with_pre-existing_vnet_-_lack_required_subnets
--- PASS: TestNetworkSpecWithPreexistingVnetLackRequiredSubnets (0.00s)
    --- PASS: TestNetworkSpecWithPreexistingVnetLackRequiredSubnets/azurecluster_networkspec_with_pre-existing_vnet_-_lack_required_subnets (0.00s)
=== RUN   TestNetworkSpecWithPreexistingVnetInvalidResourceGroup
=== RUN   TestNetworkSpecWithPreexistingVnetInvalidResourceGroup/azurecluster_networkspec_with_pre-existing_vnet_-_invalid_resource_group
--- PASS: TestNetworkSpecWithPreexistingVnetInvalidResourceGroup (0.00s)
    --- PASS: TestNetworkSpecWithPreexistingVnetInvalidResourceGroup/azurecluster_networkspec_with_pre-existing_vnet_-_invalid_resource_group (0.00s)
=== RUN   TestNetworkSpecWithoutPreexistingVnetValid
=== RUN   TestNetworkSpecWithoutPreexistingVnetValid/azurecluster_networkspec_without_pre-existing_vnet_-_valid
--- PASS: TestNetworkSpecWithoutPreexistingVnetValid (0.00s)
    --- PASS: TestNetworkSpecWithoutPreexistingVnetValid/azurecluster_networkspec_without_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestResourceGroupValid
=== RUN   TestResourceGroupValid/resourcegroup_name_-_valid
--- PASS: TestResourceGroupValid (0.00s)
    --- PASS: TestResourceGroupValid/resourcegroup_name_-_valid (0.00s)
=== RUN   TestResourceGroupInvalid
=== RUN   TestResourceGroupInvalid/resourcegroup_name_-_invalid
--- PASS: TestResourceGroupInvalid (0.00s)
    --- PASS: TestResourceGroupInvalid/resourcegroup_name_-_invalid (0.00s)
=== RUN   TestValidateVnetCIDR
=== RUN   TestValidateVnetCIDR/valid_subnet_cidr
=== RUN   TestValidateVnetCIDR/invalid_subnet_cidr_not_in_the_right_format
--- PASS: TestValidateVnetCIDR (0.00s)
    --- PASS: TestValidateVnetCIDR/valid_subnet_cidr (0.00s)
    --- PASS: TestValidateVnetCIDR/invalid_subnet_cidr_not_in_the_right_format (0.00s)
=== RUN   TestSubnetsValid
=== RUN   TestSubnetsValid/subnets_-_valid
--- PASS: TestSubnetsValid (0.00s)
    --- PASS: TestSubnetsValid/subnets_-_valid (0.00s)
=== RUN   TestSubnetsInvalidSubnetName
=== RUN   TestSubnetsInvalidSubnetName/subnets_-_invalid_subnet_name
--- PASS: TestSubnetsInvalidSubnetName (0.00s)
    --- PASS: TestSubnetsInvalidSubnetName/subnets_-_invalid_subnet_name (0.00s)
=== RUN   TestSubnetsInvalidLackRequiredSubnet
=== RUN   TestSubnetsInvalidLackRequiredSubnet/subnets_-_lack_required_subnet
--- PASS: TestSubnetsInvalidLackRequiredSubnet (0.00s)
    --- PASS: TestSubnetsInvalidLackRequiredSubnet/subnets_-_lack_required_subnet (0.00s)
=== RUN   TestSubnetNamesNotUnique
=== RUN   TestSubnetNamesNotUnique/subnets_-_names_not_unique
--- PASS: TestSubnetNamesNotUnique (0.00s)
    --- PASS: TestSubnetNamesNotUnique/subnets_-_names_not_unique (0.00s)
=== RUN   TestSubnetNameValid
=== RUN   TestSubnetNameValid/subnet_name_-_valid
--- PASS: TestSubnetNameValid (0.00s)
    --- PASS: TestSubnetNameValid/subnet_name_-_valid (0.00s)
=== RUN   TestSubnetNameInvalid
=== RUN   TestSubnetNameInvalid/subnet_name_-_invalid
--- PASS: TestSubnetNameInvalid (0.00s)
    --- PASS: TestSubnetNameInvalid/subnet_name_-_invalid (0.00s)
=== RUN   TestValidateSubnetCIDR
=== RUN   TestValidateSubnetCIDR/valid_subnet_cidr
=== RUN   TestValidateSubnetCIDR/invalid_subnet_cidr_not_in_the_right_format
=== RUN   TestValidateSubnetCIDR/subnet_cidr_not_in_vnet_range
=== RUN   TestValidateSubnetCIDR/subnet_cidr_in_atleast_one_vnet's_range_in_case_of_multiple_vnet_cidr_blocks
--- PASS: TestValidateSubnetCIDR (0.00s)
    --- PASS: TestValidateSubnetCIDR/valid_subnet_cidr (0.00s)
    --- PASS: TestValidateSubnetCIDR/invalid_subnet_cidr_not_in_the_right_format (0.00s)
    --- PASS: TestValidateSubnetCIDR/subnet_cidr_not_in_vnet_range (0.00s)
    --- PASS: TestValidateSubnetCIDR/subnet_cidr_in_atleast_one_vnet's_range_in_case_of_multiple_vnet_cidr_blocks (0.00s)
=== RUN   TestValidateSecurityRule
=== RUN   TestValidateSecurityRule/security_rule_-_valid_priority
=== PAUSE TestValidateSecurityRule/security_rule_-_valid_priority
=== RUN   TestValidateSecurityRule/security_rule_-_invalid_low_priority
=== PAUSE TestValidateSecurityRule/security_rule_-_invalid_low_priority
=== RUN   TestValidateSecurityRule/security_rule_-_invalid_high_priority
=== PAUSE TestValidateSecurityRule/security_rule_-_invalid_high_priority
=== CONT  TestValidateSecurityRule/security_rule_-_valid_priority
=== CONT  TestValidateSecurityRule/security_rule_-_invalid_high_priority
=== CONT  TestValidateSecurityRule/security_rule_-_invalid_low_priority
--- PASS: TestValidateSecurityRule (0.00s)
    --- PASS: TestValidateSecurityRule/security_rule_-_valid_priority (0.00s)
    --- PASS: TestValidateSecurityRule/security_rule_-_invalid_low_priority (0.00s)
    --- PASS: TestValidateSecurityRule/security_rule_-_invalid_high_priority (0.00s)
=== RUN   TestValidateAPIServerLB
=== RUN   TestValidateAPIServerLB/invalid_SKU
=== PAUSE TestValidateAPIServerLB/invalid_SKU
=== RUN   TestValidateAPIServerLB/invalid_Type
=== PAUSE TestValidateAPIServerLB/invalid_Type
=== RUN   TestValidateAPIServerLB/invalid_Name
=== PAUSE TestValidateAPIServerLB/invalid_Name
=== RUN   TestValidateAPIServerLB/too_many_IP_configs
=== PAUSE TestValidateAPIServerLB/too_many_IP_configs
=== RUN   TestValidateAPIServerLB/public_LB_with_private_IP
=== PAUSE TestValidateAPIServerLB/public_LB_with_private_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_public_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_public_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_invalid_private_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_invalid_private_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_in_range_private_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_in_range_private_IP
=== CONT  TestValidateAPIServerLB/invalid_SKU
=== CONT  TestValidateAPIServerLB/internal_LB_with_public_IP
=== CONT  TestValidateAPIServerLB/too_many_IP_configs
=== CONT  TestValidateAPIServerLB/public_LB_with_private_IP
=== CONT  TestValidateAPIServerLB/invalid_Type
=== CONT  TestValidateAPIServerLB/invalid_Name
=== CONT  TestValidateAPIServerLB/internal_LB_with_invalid_private_IP
=== CONT  TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP
=== CONT  TestValidateAPIServerLB/internal_LB_with_in_range_private_IP
--- PASS: TestValidateAPIServerLB (0.00s)
    --- PASS: TestValidateAPIServerLB/invalid_SKU (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_public_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/invalid_Type (0.00s)
    --- PASS: TestValidateAPIServerLB/too_many_IP_configs (0.00s)
    --- PASS: TestValidateAPIServerLB/public_LB_with_private_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/invalid_Name (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_invalid_private_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_in_range_private_IP (0.00s)
=== RUN   TestPrivateDNSZoneName
=== RUN   TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName
=== PAUSE TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName
=== RUN   TestPrivateDNSZoneName/testValidPrivateDNSZoneName
=== PAUSE TestPrivateDNSZoneName/testValidPrivateDNSZoneName
=== RUN   TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore
=== PAUSE TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore
=== RUN   TestPrivateDNSZoneName/testBadAPIServerLBType
=== PAUSE TestPrivateDNSZoneName/testBadAPIServerLBType
=== CONT  TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName
=== CONT  TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore
=== CONT  TestPrivateDNSZoneName/testBadAPIServerLBType
=== CONT  TestPrivateDNSZoneName/testValidPrivateDNSZoneName
--- PASS: TestPrivateDNSZoneName (0.00s)
    --- PASS: TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore (0.00s)
    --- PASS: TestPrivateDNSZoneName/testBadAPIServerLBType (0.00s)
    --- PASS: TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName (0.00s)
    --- PASS: TestPrivateDNSZoneName/testValidPrivateDNSZoneName (0.00s)
=== RUN   TestValidateNodeOutboundLB
=== RUN   TestValidateNodeOutboundLB/no_lb_for_public_clusters
=== PAUSE TestValidateNodeOutboundLB/no_lb_for_public_clusters
=== RUN   TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters
=== PAUSE TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters
=== RUN   TestValidateNodeOutboundLB/invalid_ID_update
=== PAUSE TestValidateNodeOutboundLB/invalid_ID_update
=== RUN   TestValidateNodeOutboundLB/invalid_Name_update
=== PAUSE TestValidateNodeOutboundLB/invalid_Name_update
=== RUN   TestValidateNodeOutboundLB/invalid_SKU_update
=== PAUSE TestValidateNodeOutboundLB/invalid_SKU_update
=== RUN   TestValidateNodeOutboundLB/invalid_FrontendIps_update
=== PAUSE TestValidateNodeOutboundLB/invalid_FrontendIps_update
=== RUN   TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes
=== PAUSE TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes
=== RUN   TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== PAUSE TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== CONT  TestValidateNodeOutboundLB/no_lb_for_public_clusters
=== CONT  TestValidateNodeOutboundLB/invalid_SKU_update
=== CONT  TestValidateNodeOutboundLB/invalid_ID_update
=== CONT  TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== CONT  TestValidateNodeOutboundLB/invalid_FrontendIps_update
=== CONT  TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters
=== CONT  TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes
=== CONT  TestValidateNodeOutboundLB/invalid_Name_update
--- PASS: TestValidateNodeOutboundLB (0.00s)
    --- PASS: TestValidateNodeOutboundLB/no_lb_for_public_clusters (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_SKU_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_ID_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value (0.00s)
    --- PASS: TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters (0.00s)
    --- PASS: TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_Name_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_FrontendIps_update (0.00s)
=== RUN   TestValidateControlPlaneNodeOutboundLB
=== RUN   TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters
=== PAUSE TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters
=== RUN   TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters
=== PAUSE TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters
=== RUN   TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters
=== PAUSE TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters
=== RUN   TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== PAUSE TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== CONT  TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters
=== CONT  TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters
=== CONT  TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters
=== CONT  TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value
--- PASS: TestValidateControlPlaneNodeOutboundLB (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value (0.00s)
=== RUN   TestValidateCloudProviderConfigOverrides
=== RUN   TestValidateCloudProviderConfigOverrides/both_old_and_new_config_nil
=== RUN   TestValidateCloudProviderConfigOverrides/both_old_and_new_config_are_same
=== RUN   TestValidateCloudProviderConfigOverrides/old_and_new_config_are_not_same
=== RUN   TestValidateCloudProviderConfigOverrides/new_config_is_nil
=== RUN   TestValidateCloudProviderConfigOverrides/old_config_is_nil
--- PASS: TestValidateCloudProviderConfigOverrides (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/both_old_and_new_config_nil (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/both_old_and_new_config_are_same (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/old_and_new_config_are_not_same (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/new_config_is_nil (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/old_config_is_nil (0.00s)
=== RUN   TestAzureCluster_ValidateCreate
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
--- PASS: TestAzureCluster_ValidateCreate (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_without_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name (0.00s)
=== RUN   TestAzureCluster_ValidateUpdate
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01
=== RUN   TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== CONT  TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01
--- PASS: TestAzureCluster_ValidateUpdate (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01 (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name (0.00s)
=== RUN   TestImageOptional
--- PASS: TestImageOptional (0.00s)
=== RUN   TestImageTooManyDetails
--- PASS: TestImageTooManyDetails (0.00s)
=== RUN   TestSharedImageGalleryValid
--- PASS: TestSharedImageGalleryValid (0.00s)
=== RUN   TestMarketPlaceImageValid
--- PASS: TestMarketPlaceImageValid (0.00s)
=== RUN   TestImageByIDValid
--- PASS: TestImageByIDValid (0.00s)
=== RUN   TestAzureMachineSpec_SetDefaultSSHPublicKey
--- PASS: TestAzureMachineSpec_SetDefaultSSHPublicKey (0.06s)
=== RUN   TestAzureMachineSpec_SetIdentityDefaults
--- PASS: TestAzureMachineSpec_SetIdentityDefaults (0.00s)
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/no_disks
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/no_disks
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/no_disks
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified
--- PASS: TestAzureMachineSpec_SetDataDisksDefaults (0.00s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified (0.07s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/no_disks (0.13s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing (0.15s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified (0.18s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified (0.38s)
=== RUN   TestAzureMachine_ValidateSSHKey
=== RUN   TestAzureMachine_ValidateSSHKey/valid_ssh_key
=== RUN   TestAzureMachine_ValidateSSHKey/invalid_ssh_key
=== RUN   TestAzureMachine_ValidateSSHKey/ssh_key_not_base64_encoded
--- PASS: TestAzureMachine_ValidateSSHKey (0.45s)
    --- PASS: TestAzureMachine_ValidateSSHKey/valid_ssh_key (0.00s)
    --- PASS: TestAzureMachine_ValidateSSHKey/invalid_ssh_key (0.00s)
    --- PASS: TestAzureMachine_ValidateSSHKey/ssh_key_not_base64_encoded (0.00s)
=== RUN   TestAzureMachine_ValidateOSDisk
=== RUN   TestAzureMachine_ValidateOSDisk/valid_os_disk_spec
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_cache_type
=== RUN   TestAzureMachine_ValidateOSDisk/valid_ephemeral_os_disk_spec
=== RUN   TestAzureMachine_ValidateOSDisk/byoc_encryption_with_ephemeral_os_disk_spec
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-0
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-1
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-2
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-3
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-4
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-5
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-6
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-7
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-8
--- PASS: TestAzureMachine_ValidateOSDisk (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/valid_os_disk_spec (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_cache_type (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/valid_ephemeral_os_disk_spec (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/byoc_encryption_with_ephemeral_os_disk_spec (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-0 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-1 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-2 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-3 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-4 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-5 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-6 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-7 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-8 (0.00s)
=== RUN   TestAzureMachine_ValidateDataDisks
=== RUN   TestAzureMachine_ValidateDataDisks/valid_nil_data_disks
=== RUN   TestAzureMachine_ValidateDataDisks/valid_empty_data_disks
=== RUN   TestAzureMachine_ValidateDataDisks/valid_disks
=== RUN   TestAzureMachine_ValidateDataDisks/duplicate_names
=== RUN   TestAzureMachine_ValidateDataDisks/duplicate_LUNs
=== RUN   TestAzureMachine_ValidateDataDisks/invalid_disk_size
=== RUN   TestAzureMachine_ValidateDataDisks/empty_name
=== RUN   TestAzureMachine_ValidateDataDisks/invalid_disk_cachingType
=== RUN   TestAzureMachine_ValidateDataDisks/valid_disk_cachingType
=== RUN   TestAzureMachine_ValidateDataDisks/valid_managed_disk_storage_account_type
=== RUN   TestAzureMachine_ValidateDataDisks/invalid_managed_disk_storage_account_type
--- PASS: TestAzureMachine_ValidateDataDisks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_nil_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_empty_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/duplicate_names (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/duplicate_LUNs (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/invalid_disk_size (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/empty_name (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/invalid_disk_cachingType (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_disk_cachingType (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_managed_disk_storage_account_type (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/invalid_managed_disk_storage_account_type (0.00s)
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/valid_UUID
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/wrong_Identity_type
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/not_a_valid_UUID
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/empty
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/changed
--- PASS: TestAzureMachine_ValidateSystemAssignedIdentity (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/valid_UUID (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/wrong_Identity_type (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/not_a_valid_UUID (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/empty (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/changed (0.00s)
=== RUN   TestAzureMachine_ValidateDataDisksUpdate
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/valid_nil_data_disks
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/valid_empty_data_disks
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/valid_data_disk_updates
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/cannot_update_data_disk_fields_after_machine_creation
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/validate_updates_to_optional_fields
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_added_after_machine_creation
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_removed_after_machine_creation
--- PASS: TestAzureMachine_ValidateDataDisksUpdate (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/valid_nil_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/valid_empty_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/valid_data_disk_updates (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/cannot_update_data_disk_fields_after_machine_creation (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/validate_updates_to_optional_fields (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_added_after_machine_creation (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_removed_after_machine_creation (0.00s)
=== RUN   TestAzureMachine_ValidateCreate
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_full
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_publisher
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_shared_gallery_image_-_full
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_subscription
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_with_id
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_without_id
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_valid_SSHPublicKey
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_without_SSHPublicKey
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_invalid_SSHPublicKey
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_list_of_user-assigned_identities
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_empty_list_of_user-assigned_identities
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_valid_osDisk_cache_type
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_invalid_osDisk_cache_type
--- PASS: TestAzureMachine_ValidateCreate (0.51s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_full (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_publisher (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_shared_gallery_image_-_full (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_subscription (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_with_id (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_without_id (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_without_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_empty_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_valid_osDisk_cache_type (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_invalid_osDisk_cache_type (0.00s)
=== RUN   TestAzureMachine_ValidateUpdate
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.image_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.image_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.Identity_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.Identity_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.UserAssignedIdentities_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.UserAssignedIdentities_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.RoleAssignmentName_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.RoleAssignmentName_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.OSDisk_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.OSDisk_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.DataDisks_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.DataDisks_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SSHPublicKey_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SSHPublicKey_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AllocatePublicIP_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AllocatePublicIP_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.EnableIPForwarding_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.EnableIPForwarding_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AcceleratedNetworking_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AcceleratedNetworking_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SpotVMOptions_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SpotVMOptions_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SecurityProfile_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SecurityProfile_is_immutable
--- PASS: TestAzureMachine_ValidateUpdate (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.image_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.image_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.Identity_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.Identity_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.UserAssignedIdentities_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.UserAssignedIdentities_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.RoleAssignmentName_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.RoleAssignmentName_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.OSDisk_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.OSDisk_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.DataDisks_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.DataDisks_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SSHPublicKey_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SSHPublicKey_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AllocatePublicIP_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AllocatePublicIP_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.EnableIPForwarding_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.EnableIPForwarding_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AcceleratedNetworking_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AcceleratedNetworking_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SpotVMOptions_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SpotVMOptions_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SecurityProfile_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SecurityProfile_is_immutable (0.00s)
=== RUN   TestAzureMachine_Default
--- PASS: TestAzureMachine_Default (1.50s)
=== RUN   TestAzureMachineTemplate_ValidateCreate
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplane_image_-_full
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_publisher
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_shared_gallery_image_-_full
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_subscription
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_with_id
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_without_id
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_SSHPublicKey
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_without_SSHPublicKey
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_SSHPublicKey
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_list_of_user-assigned_identities
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_empty_list_of_user-assigned_identities
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_osDisk_cache_type
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_osDisk_cache_type
--- PASS: TestAzureMachineTemplate_ValidateCreate (0.43s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplane_image_-_full (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_publisher (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_shared_gallery_image_-_full (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_subscription (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_with_id (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_without_id (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_without_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_empty_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_osDisk_cache_type (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_osDisk_cache_type (0.00s)
=== RUN   TestAzureMachineTemplate_ValidateUpdate
=== RUN   TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec
=== PAUSE TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec
=== RUN   TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata
=== PAUSE TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata
=== CONT  TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec
=== CONT  TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata
--- PASS: TestAzureMachineTemplate_ValidateUpdate (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata (0.00s)
=== RUN   TestTags_Merge
=== RUN   TestTags_Merge/nil_other
=== PAUSE TestTags_Merge/nil_other
=== RUN   TestTags_Merge/empty_other
=== PAUSE TestTags_Merge/empty_other
=== RUN   TestTags_Merge/disjoint
=== PAUSE TestTags_Merge/disjoint
=== RUN   TestTags_Merge/overlapping,_other_wins
=== PAUSE TestTags_Merge/overlapping,_other_wins
=== CONT  TestTags_Merge/nil_other
=== CONT  TestTags_Merge/disjoint
=== CONT  TestTags_Merge/empty_other
=== CONT  TestTags_Merge/overlapping,_other_wins
--- PASS: TestTags_Merge (0.00s)
    --- PASS: TestTags_Merge/nil_other (0.00s)
    --- PASS: TestTags_Merge/disjoint (0.00s)
    --- PASS: TestTags_Merge/empty_other (0.00s)
    --- PASS: TestTags_Merge/overlapping,_other_wins (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4	4.722s
=== RUN   TestGetDefaultImageSKUID
=== RUN   TestGetDefaultImageSKUID/v1.14.9
=== RUN   TestGetDefaultImageSKUID/v1.14.10
=== RUN   TestGetDefaultImageSKUID/v1.15.6
=== RUN   TestGetDefaultImageSKUID/v1.15.7
=== RUN   TestGetDefaultImageSKUID/v1.16.3
=== RUN   TestGetDefaultImageSKUID/v1.16.4
=== RUN   TestGetDefaultImageSKUID/1.12.0
=== RUN   TestGetDefaultImageSKUID/1.1.notvalid.semver
=== RUN   TestGetDefaultImageSKUID/v1.19.3
=== RUN   TestGetDefaultImageSKUID/v1.20.8
=== RUN   TestGetDefaultImageSKUID/v1.21.2
=== RUN   TestGetDefaultImageSKUID/v1.20.8#01
=== RUN   TestGetDefaultImageSKUID/v1.21.2#01
--- PASS: TestGetDefaultImageSKUID (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.14.9 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.14.10 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.15.6 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.15.7 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.16.3 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.16.4 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/1.12.0 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/1.1.notvalid.semver (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.19.3 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.20.8 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.21.2 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.20.8#01 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.21.2#01 (0.00s)
=== RUN   TestAutoRestClientAppendUserAgent
=== RUN   TestAutoRestClientAppendUserAgent/should_append_extension_to_user_agent_if_extension_is_not_empty
=== RUN   TestAutoRestClientAppendUserAgent/should_no_changed_if_extension_is_empty
--- PASS: TestAutoRestClientAppendUserAgent (0.00s)
    --- PASS: TestAutoRestClientAppendUserAgent/should_append_extension_to_user_agent_if_extension_is_not_empty (0.00s)
    --- PASS: TestAutoRestClientAppendUserAgent/should_no_changed_if_extension_is_empty (0.00s)
=== RUN   TestGetDefaultUbuntuImage
=== RUN   TestGetDefaultUbuntuImage/v1.15.6
=== RUN   TestGetDefaultUbuntuImage/v1.17.11
=== RUN   TestGetDefaultUbuntuImage/v1.18.19
=== RUN   TestGetDefaultUbuntuImage/v1.18.20
=== RUN   TestGetDefaultUbuntuImage/v1.19.11
=== RUN   TestGetDefaultUbuntuImage/v1.19.12
=== RUN   TestGetDefaultUbuntuImage/v1.21.1
=== RUN   TestGetDefaultUbuntuImage/v1.21.2
=== RUN   TestGetDefaultUbuntuImage/v1.22.0
=== RUN   TestGetDefaultUbuntuImage/v1.23.6
--- PASS: TestGetDefaultUbuntuImage (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.15.6 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.17.11 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.18.19 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.18.20 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.19.11 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.19.12 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.21.1 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.21.2 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.22.0 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.23.6 (0.00s)
=== RUN   TestMSCorrelationIDSendDecorator
--- PASS: TestMSCorrelationIDSendDecorator (0.00s)
=== RUN   TestVMSS_HasModelChanges
=== RUN   TestVMSS_HasModelChanges/two_empty_VMSS
=== RUN   TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes
=== RUN   TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes#01
=== RUN   TestVMSS_HasModelChanges/same_default_VMSS
=== RUN   TestVMSS_HasModelChanges/with_different_identity
=== RUN   TestVMSS_HasModelChanges/with_different_Zones
=== RUN   TestVMSS_HasModelChanges/with_empty_image
=== RUN   TestVMSS_HasModelChanges/with_different_image_reference_ID
=== RUN   TestVMSS_HasModelChanges/with_different_SKU
=== RUN   TestVMSS_HasModelChanges/with_different_Tags
--- PASS: TestVMSS_HasModelChanges (0.00s)
    --- PASS: TestVMSS_HasModelChanges/two_empty_VMSS (0.00s)
    --- PASS: TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes (0.00s)
    --- PASS: TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes#01 (0.00s)
    --- PASS: TestVMSS_HasModelChanges/same_default_VMSS (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_identity (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_Zones (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_empty_image (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_image_reference_ID (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_SKU (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_Tags (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure	0.718s
=== RUN   Test_GetRecordType
=== RUN   Test_GetRecordType/ipv4
=== PAUSE Test_GetRecordType/ipv4
=== RUN   Test_GetRecordType/ipv6
=== PAUSE Test_GetRecordType/ipv6
=== RUN   Test_GetRecordType/default
=== PAUSE Test_GetRecordType/default
=== CONT  Test_GetRecordType/ipv4
=== CONT  Test_GetRecordType/default
=== CONT  Test_GetRecordType/ipv6
--- PASS: Test_GetRecordType (0.00s)
    --- PASS: Test_GetRecordType/ipv4 (0.00s)
    --- PASS: Test_GetRecordType/default (0.00s)
    --- PASS: Test_GetRecordType/ipv6 (0.00s)
=== RUN   Test_SDKToFuture
=== RUN   Test_SDKToFuture/valid_future
=== PAUSE Test_SDKToFuture/valid_future
=== CONT  Test_SDKToFuture/valid_future
--- PASS: Test_SDKToFuture (0.00s)
    --- PASS: Test_SDKToFuture/valid_future (0.00s)
=== RUN   Test_FutureToSDK
=== RUN   Test_FutureToSDK/data_is_empty
=== PAUSE Test_FutureToSDK/data_is_empty
=== RUN   Test_FutureToSDK/data_is_not_base64_encoded
=== PAUSE Test_FutureToSDK/data_is_not_base64_encoded
=== RUN   Test_FutureToSDK/base64_data_is_not_a_valid_future
=== PAUSE Test_FutureToSDK/base64_data_is_not_a_valid_future
=== RUN   Test_FutureToSDK/valid_future_data
=== PAUSE Test_FutureToSDK/valid_future_data
=== CONT  Test_FutureToSDK/data_is_empty
=== CONT  Test_FutureToSDK/base64_data_is_not_a_valid_future
=== CONT  Test_FutureToSDK/data_is_not_base64_encoded
=== CONT  Test_FutureToSDK/valid_future_data
--- PASS: Test_FutureToSDK (0.00s)
    --- PASS: Test_FutureToSDK/data_is_empty (0.00s)
    --- PASS: Test_FutureToSDK/data_is_not_base64_encoded (0.00s)
    --- PASS: Test_FutureToSDK/base64_data_is_not_a_valid_future (0.00s)
    --- PASS: Test_FutureToSDK/valid_future_data (0.00s)
=== RUN   Test_UserAssignedIdentitiesToVMSDK
=== RUN   Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData
=== PAUSE Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData
=== RUN   Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError
=== PAUSE Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError
=== CONT  Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData
=== CONT  Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError
--- PASS: Test_UserAssignedIdentitiesToVMSDK (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError (0.00s)
=== RUN   Test_UserAssignedIdentitiesToVMSSSDK
=== RUN   Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData
=== PAUSE Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData
=== RUN   Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError
=== PAUSE Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError
=== CONT  Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData
=== CONT  Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError
--- PASS: Test_UserAssignedIdentitiesToVMSSSDK (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError (0.00s)
=== RUN   Test_SDKToVMSS
=== RUN   Test_SDKToVMSS/ShouldPopulateWithData
=== PAUSE Test_SDKToVMSS/ShouldPopulateWithData
=== CONT  Test_SDKToVMSS/ShouldPopulateWithData
--- PASS: Test_SDKToVMSS (0.00s)
    --- PASS: Test_SDKToVMSS/ShouldPopulateWithData (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/converters	3.251s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/mock_azure	[no test files]
=== RUN   TestGettingEnvironment
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureUSGovernmentCloud
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureChina
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureGermany
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_has_an_invalid_value
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_empty
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzurePublicCloud
--- PASS: TestGettingEnvironment (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureUSGovernmentCloud (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureChina (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureGermany (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_has_an_invalid_value (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_empty (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzurePublicCloud (0.00s)
=== RUN   TestGettingSecurityRules
--- PASS: TestGettingSecurityRules (0.00s)
=== RUN   TestOutboundLBName
=== RUN   TestOutboundLBName/public_cluster_node_outbound_lb
=== RUN   TestOutboundLBName/public_cluster_control_plane_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_with_node_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_without_node_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_with_control_plane_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_without_control_plane_outbound_lb
--- PASS: TestOutboundLBName (0.00s)
    --- PASS: TestOutboundLBName/public_cluster_node_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/public_cluster_control_plane_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_with_node_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_without_node_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_with_control_plane_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_without_control_plane_outbound_lb (0.00s)
=== RUN   TestAllowedNamespaces
=== RUN   TestAllowedNamespaces/allow_any_cluster_namespace_when_empty
=== RUN   TestAllowedNamespaces/no_namespaces_allowed_when_list_is_empty
=== RUN   TestAllowedNamespaces/allow_cluster_with_namespace_in_list
=== RUN   TestAllowedNamespaces/don't_allow_cluster_with_namespace_not_in_list
=== RUN   TestAllowedNamespaces/allow_cluster_when_namespace_has_selector_with_matching_label
=== RUN   TestAllowedNamespaces/don't_allow_cluster_when_namespace_has_selector_with_different_label
--- PASS: TestAllowedNamespaces (0.00s)
    --- PASS: TestAllowedNamespaces/allow_any_cluster_namespace_when_empty (0.00s)
    --- PASS: TestAllowedNamespaces/no_namespaces_allowed_when_list_is_empty (0.00s)
    --- PASS: TestAllowedNamespaces/allow_cluster_with_namespace_in_list (0.00s)
    --- PASS: TestAllowedNamespaces/don't_allow_cluster_with_namespace_not_in_list (0.00s)
    --- PASS: TestAllowedNamespaces/allow_cluster_when_namespace_has_selector_with_matching_label (0.00s)
    --- PASS: TestAllowedNamespaces/don't_allow_cluster_when_namespace_has_selector_with_different_label (0.00s)
=== RUN   TestMachineScope_Name
=== RUN   TestMachineScope_Name/if_provider_ID_exists,_use_it
=== RUN   TestMachineScope_Name/linux_can_be_any_length
=== RUN   TestMachineScope_Name/Windows_name_with_long_MachineName_and_short_cluster_name
=== RUN   TestMachineScope_Name/Windows_name_with_long_MachineName_and_long_cluster_name
--- PASS: TestMachineScope_Name (0.00s)
    --- PASS: TestMachineScope_Name/if_provider_ID_exists,_use_it (0.00s)
    --- PASS: TestMachineScope_Name/linux_can_be_any_length (0.00s)
    --- PASS: TestMachineScope_Name/Windows_name_with_long_MachineName_and_short_cluster_name (0.00s)
    --- PASS: TestMachineScope_Name/Windows_name_with_long_MachineName_and_long_cluster_name (0.00s)
=== RUN   TestMachineScope_GetVMID
=== RUN   TestMachineScope_GetVMID/returns_the_vm_name_from_provider_ID
=== RUN   TestMachineScope_GetVMID/returns_empty_if_provider_ID_is_invalid
--- PASS: TestMachineScope_GetVMID (0.00s)
    --- PASS: TestMachineScope_GetVMID/returns_the_vm_name_from_provider_ID (0.00s)
    --- PASS: TestMachineScope_GetVMID/returns_empty_if_provider_ID_is_invalid (0.00s)
=== RUN   TestMachineScope_ProviderID
=== RUN   TestMachineScope_ProviderID/returns_the_entire_provider_ID
=== RUN   TestMachineScope_ProviderID/returns_empty_if_provider_ID_is_invalid
--- PASS: TestMachineScope_ProviderID (0.00s)
    --- PASS: TestMachineScope_ProviderID/returns_the_entire_provider_ID (0.00s)
    --- PASS: TestMachineScope_ProviderID/returns_empty_if_provider_ID_is_invalid (0.00s)
=== RUN   TestMachineScope_PublicIPSpecs
=== RUN   TestMachineScope_PublicIPSpecs/returns_nil_if_AllocatePublicIP_is_false
=== RUN   TestMachineScope_PublicIPSpecs/appends_to_PublicIPSpec_for_node_if_AllocatePublicIP_is_true
--- PASS: TestMachineScope_PublicIPSpecs (0.00s)
    --- PASS: TestMachineScope_PublicIPSpecs/returns_nil_if_AllocatePublicIP_is_false (0.00s)
    --- PASS: TestMachineScope_PublicIPSpecs/appends_to_PublicIPSpec_for_node_if_AllocatePublicIP_is_true (0.00s)
=== RUN   TestMachineScope_InboundNatSpecs
=== RUN   TestMachineScope_InboundNatSpecs/returns_empty_when_infra_is_not_control_plane
=== RUN   TestMachineScope_InboundNatSpecs/returns_InboundNatSpec_when_infra_is_control_plane
--- PASS: TestMachineScope_InboundNatSpecs (0.00s)
    --- PASS: TestMachineScope_InboundNatSpecs/returns_empty_when_infra_is_not_control_plane (0.00s)
    --- PASS: TestMachineScope_InboundNatSpecs/returns_InboundNatSpec_when_infra_is_control_plane (0.00s)
=== RUN   TestMachineScope_RoleAssignmentSpecs
=== RUN   TestMachineScope_RoleAssignmentSpecs/returns_empty_if_VM_identity_is_system_assigned
=== RUN   TestMachineScope_RoleAssignmentSpecs/returns_RoleAssignmentSpec_if_VM_identity_is_not_system_assigned
--- PASS: TestMachineScope_RoleAssignmentSpecs (0.00s)
    --- PASS: TestMachineScope_RoleAssignmentSpecs/returns_empty_if_VM_identity_is_system_assigned (0.00s)
    --- PASS: TestMachineScope_RoleAssignmentSpecs/returns_RoleAssignmentSpec_if_VM_identity_is_not_system_assigned (0.00s)
=== RUN   TestMachineScope_VMExtensionSpecs
=== RUN   TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_AzurePublicCloud,_it_returns_VMExtensionSpec
=== RUN   TestMachineScope_VMExtensionSpecs/If_OS_type_is_not_Linux_and_cloud_is_AzurePublicCloud,_it_returns_empty
=== RUN   TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_not_AzurePublicCloud,_it_returns_empty
--- PASS: TestMachineScope_VMExtensionSpecs (0.00s)
    --- PASS: TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_AzurePublicCloud,_it_returns_VMExtensionSpec (0.00s)
    --- PASS: TestMachineScope_VMExtensionSpecs/If_OS_type_is_not_Linux_and_cloud_is_AzurePublicCloud,_it_returns_empty (0.00s)
    --- PASS: TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_not_AzurePublicCloud,_it_returns_empty (0.00s)
=== RUN   TestMachineScope_Subnet
=== RUN   TestMachineScope_Subnet/returns_empty_if_no_subnet_is_found_at_cluster_scope
=== RUN   TestMachineScope_Subnet/returns_the_machine_subnet_name_if_the_same_is_present_in_the_cluster_scope
=== RUN   TestMachineScope_Subnet/returns_empty_if_machine_subnet_name_is_not_present_in_the_cluster_scope
--- PASS: TestMachineScope_Subnet (0.00s)
    --- PASS: TestMachineScope_Subnet/returns_empty_if_no_subnet_is_found_at_cluster_scope (0.00s)
    --- PASS: TestMachineScope_Subnet/returns_the_machine_subnet_name_if_the_same_is_present_in_the_cluster_scope (0.00s)
    --- PASS: TestMachineScope_Subnet/returns_empty_if_machine_subnet_name_is_not_present_in_the_cluster_scope (0.00s)
=== RUN   TestMachineScope_AvailabilityZone
=== RUN   TestMachineScope_AvailabilityZone/returns_empty_if_no_failure_domain_is_present
=== RUN   TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_machine_spec
=== RUN   TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_azuremachine_spec
--- PASS: TestMachineScope_AvailabilityZone (0.00s)
    --- PASS: TestMachineScope_AvailabilityZone/returns_empty_if_no_failure_domain_is_present (0.00s)
    --- PASS: TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_machine_spec (0.00s)
    --- PASS: TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_azuremachine_spec (0.00s)
=== RUN   TestMachineScope_Namespace
=== RUN   TestMachineScope_Namespace/returns_azure_machine_namespace
=== RUN   TestMachineScope_Namespace/returns_azure_machine_namespace_as_empty_if_namespace_is_no_specified
--- PASS: TestMachineScope_Namespace (0.00s)
    --- PASS: TestMachineScope_Namespace/returns_azure_machine_namespace (0.00s)
    --- PASS: TestMachineScope_Namespace/returns_azure_machine_namespace_as_empty_if_namespace_is_no_specified (0.00s)
=== RUN   TestMachineScope_IsControlPlane
=== RUN   TestMachineScope_IsControlPlane/returns_false_when_machine_is_not_control_plane
=== RUN   TestMachineScope_IsControlPlane/returns_true_when_machine_is_control_plane
--- PASS: TestMachineScope_IsControlPlane (0.00s)
    --- PASS: TestMachineScope_IsControlPlane/returns_false_when_machine_is_not_control_plane (0.00s)
    --- PASS: TestMachineScope_IsControlPlane/returns_true_when_machine_is_control_plane (0.00s)
=== RUN   TestMachineScope_Role
=== RUN   TestMachineScope_Role/returns_node_when_machine_is_worker
=== RUN   TestMachineScope_Role/returns_control-plane_when_machine_is_control_plane
--- PASS: TestMachineScope_Role (0.00s)
    --- PASS: TestMachineScope_Role/returns_node_when_machine_is_worker (0.00s)
    --- PASS: TestMachineScope_Role/returns_control-plane_when_machine_is_control_plane (0.00s)
=== RUN   TestMachineScope_AvailabilitySet
=== RUN   TestMachineScope_AvailabilitySet/returns_empty_and_false_if_availability_set_is_not_enabled
=== RUN   TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_availability_set_is_enabled_and_machine_is_control_plane
=== RUN   TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_AvailabilitySet_is_enabled_for_worker_machine_which_is_part_of_machine_deployment
=== RUN   TestMachineScope_AvailabilitySet/returns_empty_and_false_if_AvailabilitySet_is_enabled_but_worker_machine_is_not_part_of_machine_deployment
--- PASS: TestMachineScope_AvailabilitySet (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_empty_and_false_if_availability_set_is_not_enabled (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_availability_set_is_enabled_and_machine_is_control_plane (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_AvailabilitySet_is_enabled_for_worker_machine_which_is_part_of_machine_deployment (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_empty_and_false_if_AvailabilitySet_is_enabled_but_worker_machine_is_not_part_of_machine_deployment (0.00s)
=== RUN   TestMachineScope_VMState
=== RUN   TestMachineScope_VMState/returns_the_VMState_if_present_in_AzureMachine_status
=== RUN   TestMachineScope_VMState/returns_empty_if_VMState_is_not_present_in_AzureMachine_status
--- PASS: TestMachineScope_VMState (0.00s)
    --- PASS: TestMachineScope_VMState/returns_the_VMState_if_present_in_AzureMachine_status (0.00s)
    --- PASS: TestMachineScope_VMState/returns_empty_if_VMState_is_not_present_in_AzureMachine_status (0.00s)
=== RUN   TestMachineScope_GetVMImage
=== RUN   TestMachineScope_GetVMImage/returns_AzureMachine_image_is_found_if_present_in_the_AzureMachine_spec
=== RUN   TestMachineScope_GetVMImage/if_no_image_is_specified_and_os_specified_is_windows,_returns_windows_image
I0920 16:06:17.608662   72906 machine.go:525]  "msg"="No image specified for machine, using default Windows Image"  "machine"="machine-name"
=== RUN   TestMachineScope_GetVMImage/if_no_image_and_OS_is_specified,_returns_linux_image
I0920 16:06:17.608938   72906 machine.go:529]  "msg"="No image specified for machine, using default Linux Image"  "machine"="machine-name"
--- PASS: TestMachineScope_GetVMImage (0.00s)
    --- PASS: TestMachineScope_GetVMImage/returns_AzureMachine_image_is_found_if_present_in_the_AzureMachine_spec (0.00s)
    --- PASS: TestMachineScope_GetVMImage/if_no_image_is_specified_and_os_specified_is_windows,_returns_windows_image (0.00s)
    --- PASS: TestMachineScope_GetVMImage/if_no_image_and_OS_is_specified,_returns_linux_image (0.00s)
=== RUN   TestMachineScope_NICSpecs
=== RUN   TestMachineScope_NICSpecs/Node_Machine_with_no_nat_gateway_and_no_public_IP_address
=== RUN   TestMachineScope_NICSpecs/Node_Machine_with_nat_gateway
=== RUN   TestMachineScope_NICSpecs/Node_Machine_with_public_IP_address
=== RUN   TestMachineScope_NICSpecs/Control_Plane_Machine_with_private_LB
=== RUN   TestMachineScope_NICSpecs/Control_Plane_Machine_with_public_LB
--- PASS: TestMachineScope_NICSpecs (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Node_Machine_with_no_nat_gateway_and_no_public_IP_address (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Node_Machine_with_nat_gateway (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Node_Machine_with_public_IP_address (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Control_Plane_Machine_with_private_LB (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Control_Plane_Machine_with_public_LB (0.00s)
=== RUN   TestMachinePoolScope_Name
=== RUN   TestMachinePoolScope_Name/linux_can_be_any_length
=== RUN   TestMachinePoolScope_Name/windows_longer_than_9_should_be_shortened
--- PASS: TestMachinePoolScope_Name (0.00s)
    --- PASS: TestMachinePoolScope_Name/linux_can_be_any_length (0.00s)
    --- PASS: TestMachinePoolScope_Name/windows_longer_than_9_should_be_shortened (0.00s)
=== RUN   TestMachinePoolScope_SetBootstrapConditions
=== RUN   TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_condition_if_provisioning_state_succeeded
=== RUN   TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_creating
=== RUN   TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_failed
--- PASS: TestMachinePoolScope_SetBootstrapConditions (0.00s)
    --- PASS: TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_condition_if_provisioning_state_succeeded (0.00s)
    --- PASS: TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_creating (0.00s)
    --- PASS: TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_failed (0.00s)
=== RUN   TestMachinePoolScope_MaxSurge
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_1_if_no_deployment_strategy_is_set
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_1_regardless_of_replica_count_with_no_surger
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_2_as_specified_by_the_surger
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_2_(50%)_of_the_desired_replicas
--- PASS: TestMachinePoolScope_MaxSurge (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_1_if_no_deployment_strategy_is_set (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_1_regardless_of_replica_count_with_no_surger (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_2_as_specified_by_the_surger (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_2_(50%)_of_the_desired_replicas (0.00s)
=== RUN   TestMachinePoolScope_SaveVMImageToStatus
--- PASS: TestMachinePoolScope_SaveVMImageToStatus (0.00s)
=== RUN   TestMachinePoolScope_GetVMImage
=== RUN   TestMachinePoolScope_GetVMImage/should_set_and_default_the_image_if_no_image_is_specified_for_the_AzureMachinePool
=== RUN   TestMachinePoolScope_GetVMImage/should_not_default_or_set_the_image_on_the_AzureMachinePool_if_it_already_exists
--- PASS: TestMachinePoolScope_GetVMImage (0.00s)
    --- PASS: TestMachinePoolScope_GetVMImage/should_set_and_default_the_image_if_no_image_is_specified_for_the_AzureMachinePool (0.00s)
    --- PASS: TestMachinePoolScope_GetVMImage/should_not_default_or_set_the_image_on_the_AzureMachinePool_if_it_already_exists (0.00s)
=== RUN   TestMachinePoolScope_NeedsRequeue
=== RUN   TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_not_in_succeeded_state
=== RUN   TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state
=== RUN   TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_not_match
=== RUN   TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_match
=== RUN   TestMachinePoolScope_NeedsRequeue/should_requeue_if_an_instance_VM_image_does_not_match_the_VM_image_of_the_VMSS
--- PASS: TestMachinePoolScope_NeedsRequeue (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_not_in_succeeded_state (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_not_match (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_match (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_requeue_if_an_instance_VM_image_does_not_match_the_VM_image_of_the_VMSS (0.00s)
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs/if_there_are_three_ready_machines_with_matching_labels,_then_should_count_them
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_machine_pool_label
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_cluster_name_label
--- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs (0.00s)
    --- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs/if_there_are_three_ready_machines_with_matching_labels,_then_should_count_them (0.00s)
    --- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_machine_pool_label (0.00s)
    --- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_cluster_name_label (0.00s)
=== RUN   TestNewMachinePoolMachineScope
=== RUN   TestNewMachinePoolMachineScope/successfully_create_machine_scope
=== RUN   TestNewMachinePoolMachineScope/no_client
=== RUN   TestNewMachinePoolMachineScope/no_ClusterScope
=== RUN   TestNewMachinePoolMachineScope/no_MachinePool
=== RUN   TestNewMachinePoolMachineScope/no_AzureMachinePool
=== RUN   TestNewMachinePoolMachineScope/no_AzureMachinePoolMachine
--- PASS: TestNewMachinePoolMachineScope (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/successfully_create_machine_scope (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_client (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_ClusterScope (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_MachinePool (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_AzureMachinePool (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_AzureMachinePoolMachine (0.00s)
=== RUN   TestMachineScope_UpdateStatus
=== RUN   TestMachineScope_UpdateStatus/should_set_kubernetes_version,_ready,_and_node_reference_upon_finding_the_node
=== RUN   TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready
=== RUN   TestMachineScope_UpdateStatus/fails_fetching_the_node
=== RUN   TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready#01
=== RUN   TestMachineScope_UpdateStatus/node_is_not_found
=== RUN   TestMachineScope_UpdateStatus/node_is_found_by_ObjectReference
=== RUN   TestMachineScope_UpdateStatus/instance_information_with_latest_model_populates_the_AMPM_status
--- PASS: TestMachineScope_UpdateStatus (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/should_set_kubernetes_version,_ready,_and_node_reference_upon_finding_the_node (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/fails_fetching_the_node (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready#01 (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/node_is_not_found (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/node_is_found_by_ObjectReference (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/instance_information_with_latest_model_populates_the_AMPM_status (0.00s)
=== RUN   TestMachinePoolMachineScope_CordonAndDrain
=== RUN   TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_provider_ID
=== RUN   TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_node_reference
=== RUN   TestMachinePoolMachineScope_CordonAndDrain/if_GetNodeByProviderID_fails_with_an_error,_an_error_will_be_returned
--- PASS: TestMachinePoolMachineScope_CordonAndDrain (0.00s)
    --- PASS: TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_provider_ID (0.00s)
    --- PASS: TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_node_reference (0.00s)
    --- PASS: TestMachinePoolMachineScope_CordonAndDrain/if_GetNodeByProviderID_fails_with_an_error,_an_error_will_be_returned (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope	2.705s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/scope/mocks	[no test files]
=== RUN   TestMachinePoolRollingUpdateStrategy_Type
--- PASS: TestMachinePoolRollingUpdateStrategy_Type (0.00s)
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/Strategy_is_empty
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_2
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_20
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_21;_rounds_up
--- PASS: TestMachinePoolRollingUpdateStrategy_Surge (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/Strategy_is_empty (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_2 (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_20 (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_21;_rounds_up (0.00s)
=== RUN   TestMachinePoolScope_maxUnavailable
=== RUN   TestMachinePoolScope_maxUnavailable/Strategy_is_empty
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_nil
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_2
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20%
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20%_and_it_rounds_down
--- PASS: TestMachinePoolScope_maxUnavailable (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/Strategy_is_empty (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_nil (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_2 (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20% (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20%_and_it_rounds_down (0.00s)
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/should_not_select_machines_to_delete_if_less_than_desired_replica_count
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_a_machine_with_an_out-of-date_model
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_the_oldest_machine
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_creation_date
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_newest_first
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_1_is_not_the_latest_model,_delete_it.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_all_are_the_latest_model,_delete_nothing.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_2,_and_there_are_2_with_the_latest_model_==_false,_delete_2.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_45%,_and_there_are_2_with_the_latest_model_==_false,_delete_1.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_30%,_and_there_are_2_with_the_latest_model_==_false,_delete_0.
--- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/should_not_select_machines_to_delete_if_less_than_desired_replica_count (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_a_machine_with_an_out-of-date_model (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_the_oldest_machine (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_creation_date (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_newest_first (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_1_is_not_the_latest_model,_delete_it. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_all_are_the_latest_model,_delete_nothing. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_2,_and_there_are_2_with_the_latest_model_==_false,_delete_2. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_45%,_and_there_are_2_with_the_latest_model_==_false,_delete_1. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_30%,_and_there_are_2_with_the_latest_model_==_false,_delete_0. (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope/strategies/machinepool_deployments	2.294s
=== RUN   TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Canceled
=== RUN   TestReconcile/agentpool_in_terminal_provisioning_state
=== PAUSE TestReconcile/agentpool_in_terminal_provisioning_state
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Succeeded
=== RUN   TestReconcile/agentpool_in_terminal_provisioning_state#01
=== PAUSE TestReconcile/agentpool_in_terminal_provisioning_state#01
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Failed
=== RUN   TestReconcile/agentpool_in_terminal_provisioning_state#02
=== PAUSE TestReconcile/agentpool_in_terminal_provisioning_state#02
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Deleting
=== RUN   TestReconcile/agentpool_in_nonterminal_provisioning_state
=== PAUSE TestReconcile/agentpool_in_nonterminal_provisioning_state
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: InProgress
=== RUN   TestReconcile/agentpool_in_nonterminal_provisioning_state#01
=== PAUSE TestReconcile/agentpool_in_nonterminal_provisioning_state#01
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: randomStringHere
=== RUN   TestReconcile/agentpool_in_nonterminal_provisioning_state#02
=== PAUSE TestReconcile/agentpool_in_nonterminal_provisioning_state#02
=== CONT  TestReconcile
    agentpools_test.go:251: Testing no agentpool exists
=== RUN   TestReconcile/no_agentpool_exists
=== PAUSE TestReconcile/no_agentpool_exists
=== CONT  TestReconcile
    agentpools_test.go:251: Testing fail to get existing agent pool
=== RUN   TestReconcile/fail_to_get_existing_agent_pool
=== PAUSE TestReconcile/fail_to_get_existing_agent_pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing can create an Agent Pool
=== RUN   TestReconcile/can_create_an_Agent_Pool
=== PAUSE TestReconcile/can_create_an_Agent_Pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing fail to create an Agent Pool
=== RUN   TestReconcile/fail_to_create_an_Agent_Pool
=== PAUSE TestReconcile/fail_to_create_an_Agent_Pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing fail to update an Agent Pool
=== RUN   TestReconcile/fail_to_update_an_Agent_Pool
=== PAUSE TestReconcile/fail_to_update_an_Agent_Pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing no update needed on Agent Pool
=== RUN   TestReconcile/no_update_needed_on_Agent_Pool
=== PAUSE TestReconcile/no_update_needed_on_Agent_Pool
=== CONT  TestReconcile/agentpool_in_terminal_provisioning_state
=== CONT  TestReconcile/no_agentpool_exists
=== CONT  TestReconcile/fail_to_create_an_Agent_Pool
=== CONT  TestReconcile/agentpool_in_nonterminal_provisioning_state
=== CONT  TestReconcile/agentpool_in_nonterminal_provisioning_state#02
=== CONT  TestReconcile/can_create_an_Agent_Pool
=== CONT  TestReconcile/fail_to_update_an_Agent_Pool
=== CONT  TestReconcile/agentpool_in_nonterminal_provisioning_state#01
=== CONT  TestReconcile/fail_to_get_existing_agent_pool
=== CONT  TestReconcile/no_update_needed_on_Agent_Pool
=== CONT  TestReconcile/agentpool_in_terminal_provisioning_state#02
=== CONT  TestReconcile/agentpool_in_terminal_provisioning_state#01
--- PASS: TestReconcile (0.00s)
    --- PASS: TestReconcile/fail_to_create_an_Agent_Pool (0.00s)
    --- PASS: TestReconcile/no_agentpool_exists (0.00s)
    --- PASS: TestReconcile/agentpool_in_nonterminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/agentpool_in_nonterminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/can_create_an_Agent_Pool (0.00s)
    --- PASS: TestReconcile/agentpool_in_nonterminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/fail_to_get_existing_agent_pool (0.00s)
    --- PASS: TestReconcile/no_update_needed_on_Agent_Pool (0.00s)
    --- PASS: TestReconcile/agentpool_in_terminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/fail_to_update_an_Agent_Pool (0.00s)
    --- PASS: TestReconcile/agentpool_in_terminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/agentpool_in_terminal_provisioning_state#01 (0.00s)
=== RUN   TestDeleteAgentPools
=== RUN   TestDeleteAgentPools/successfully_delete_an_existing_agent_pool
=== PAUSE TestDeleteAgentPools/successfully_delete_an_existing_agent_pool
=== RUN   TestDeleteAgentPools/agent_pool_already_deleted
=== PAUSE TestDeleteAgentPools/agent_pool_already_deleted
=== RUN   TestDeleteAgentPools/agent_pool_deletion_fails
=== PAUSE TestDeleteAgentPools/agent_pool_deletion_fails
=== CONT  TestDeleteAgentPools/successfully_delete_an_existing_agent_pool
=== CONT  TestDeleteAgentPools/agent_pool_deletion_fails
=== CONT  TestDeleteAgentPools/agent_pool_already_deleted
--- PASS: TestDeleteAgentPools (0.00s)
    --- PASS: TestDeleteAgentPools/successfully_delete_an_existing_agent_pool (0.00s)
    --- PASS: TestDeleteAgentPools/agent_pool_already_deleted (0.00s)
    --- PASS: TestDeleteAgentPools/agent_pool_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools	2.965s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools/mock_agentpools	[no test files]
=== RUN   TestProcessOngoingOperation
=== RUN   TestProcessOngoingOperation/no_future_data_stored_in_status
=== PAUSE TestProcessOngoingOperation/no_future_data_stored_in_status
=== RUN   TestProcessOngoingOperation/future_data_is_not_valid
=== PAUSE TestProcessOngoingOperation/future_data_is_not_valid
=== RUN   TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done
=== PAUSE TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done
=== RUN   TestProcessOngoingOperation/ongoing_operation_is_not_done
=== PAUSE TestProcessOngoingOperation/ongoing_operation_is_not_done
=== RUN   TestProcessOngoingOperation/operation_is_done
=== PAUSE TestProcessOngoingOperation/operation_is_done
=== CONT  TestProcessOngoingOperation/no_future_data_stored_in_status
=== CONT  TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done
=== CONT  TestProcessOngoingOperation/operation_is_done
=== CONT  TestProcessOngoingOperation/future_data_is_not_valid
=== CONT  TestProcessOngoingOperation/ongoing_operation_is_not_done
I0920 16:06:17.055874   72879 async.go:36]  "msg"="no long running operation found"  "resource"="test-resource" "service"="test-service"
I0920 16:06:17.055929   72879 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-resource" "service"="test-service"
I0920 16:06:17.055992   72879 async.go:59]  "msg"="long running operation has completed"  "resource"="test-resource" "service"="test-service"
--- PASS: TestProcessOngoingOperation (0.00s)
    --- PASS: TestProcessOngoingOperation/future_data_is_not_valid (0.00s)
    --- PASS: TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done (0.00s)
    --- PASS: TestProcessOngoingOperation/no_future_data_stored_in_status (0.00s)
    --- PASS: TestProcessOngoingOperation/ongoing_operation_is_not_done (0.00s)
    --- PASS: TestProcessOngoingOperation/operation_is_done (0.00s)
=== RUN   TestCreateResource
=== RUN   TestCreateResource/create_operation_is_already_in_progress
=== PAUSE TestCreateResource/create_operation_is_already_in_progress
=== RUN   TestCreateResource/create_async_returns_success
=== PAUSE TestCreateResource/create_async_returns_success
=== RUN   TestCreateResource/error_occurs_while_running_async_create
=== PAUSE TestCreateResource/error_occurs_while_running_async_create
=== RUN   TestCreateResource/create_async_exits_before_completing
=== PAUSE TestCreateResource/create_async_exits_before_completing
=== CONT  TestCreateResource/create_operation_is_already_in_progress
=== CONT  TestCreateResource/error_occurs_while_running_async_create
=== CONT  TestCreateResource/create_async_exits_before_completing
=== CONT  TestCreateResource/create_async_returns_success
I0920 16:06:17.056383   72879 async.go:76]  "msg"="creating resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0920 16:06:17.056405   72879 async.go:76]  "msg"="creating resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0920 16:06:17.056419   72879 async.go:76]  "msg"="creating resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0920 16:06:17.056438   72879 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-resource" "service"="test-service"
I0920 16:06:17.056448   72879 async.go:91]  "msg"="successfully created resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
--- PASS: TestCreateResource (0.00s)
    --- PASS: TestCreateResource/error_occurs_while_running_async_create (0.00s)
    --- PASS: TestCreateResource/create_async_exits_before_completing (0.00s)
    --- PASS: TestCreateResource/create_async_returns_success (0.00s)
    --- PASS: TestCreateResource/create_operation_is_already_in_progress (0.00s)
=== RUN   TestDeleteResource
=== RUN   TestDeleteResource/delete_operation_is_already_in_progress
=== PAUSE TestDeleteResource/delete_operation_is_already_in_progress
=== RUN   TestDeleteResource/delete_async_returns_success
=== PAUSE TestDeleteResource/delete_async_returns_success
=== RUN   TestDeleteResource/error_occurs_while_running_async_delete
=== PAUSE TestDeleteResource/error_occurs_while_running_async_delete
=== RUN   TestDeleteResource/delete_async_exits_before_completing
=== PAUSE TestDeleteResource/delete_async_exits_before_completing
=== CONT  TestDeleteResource/delete_operation_is_already_in_progress
=== CONT  TestDeleteResource/delete_async_returns_success
=== CONT  TestDeleteResource/error_occurs_while_running_async_delete
=== CONT  TestDeleteResource/delete_async_exits_before_completing
I0920 16:06:17.056717   72879 async.go:107]  "msg"="deleting resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0920 16:06:17.056728   72879 async.go:107]  "msg"="deleting resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0920 16:06:17.056744   72879 async.go:125]  "msg"="successfully deleted resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0920 16:06:17.056745   72879 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-resource" "service"="test-service"
I0920 16:06:17.056779   72879 async.go:107]  "msg"="deleting resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
--- PASS: TestDeleteResource (0.00s)
    --- PASS: TestDeleteResource/error_occurs_while_running_async_delete (0.00s)
    --- PASS: TestDeleteResource/delete_async_returns_success (0.00s)
    --- PASS: TestDeleteResource/delete_operation_is_already_in_progress (0.00s)
    --- PASS: TestDeleteResource/delete_async_exits_before_completing (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/async	3.959s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/async/mock_async	[no test files]
=== RUN   TestReconcileAvailabilitySets
=== RUN   TestReconcileAvailabilitySets/create_or_update_availability_set
=== PAUSE TestReconcileAvailabilitySets/create_or_update_availability_set
=== RUN   TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment)
=== PAUSE TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment)
=== RUN   TestReconcileAvailabilitySets/return_error
=== PAUSE TestReconcileAvailabilitySets/return_error
=== CONT  TestReconcileAvailabilitySets/create_or_update_availability_set
=== CONT  TestReconcileAvailabilitySets/return_error
=== CONT  TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment)
I0920 16:06:16.598983   72878 availabilitysets.go:83]  "msg"="creating availability set"  "availability set"="as-name"
I0920 16:06:16.599009   72878 availabilitysets.go:83]  "msg"="creating availability set"  "availability set"="as-name"
I0920 16:06:16.599545   72878 availabilitysets.go:107]  "msg"="successfully created availability set"  "availability set"="as-name"
--- PASS: TestReconcileAvailabilitySets (0.00s)
    --- PASS: TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment) (0.00s)
    --- PASS: TestReconcileAvailabilitySets/return_error (0.00s)
    --- PASS: TestReconcileAvailabilitySets/create_or_update_availability_set (0.00s)
=== RUN   TestDeleteAvailabilitySets
=== RUN   TestDeleteAvailabilitySets/deletes_availability_set
=== PAUSE TestDeleteAvailabilitySets/deletes_availability_set
=== RUN   TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false
=== PAUSE TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false
=== RUN   TestDeleteAvailabilitySets/noop_if_availability_set_has_vms
=== PAUSE TestDeleteAvailabilitySets/noop_if_availability_set_has_vms
=== RUN   TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404
=== PAUSE TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404
=== RUN   TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404
=== PAUSE TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404
=== RUN   TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails
=== PAUSE TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails
=== RUN   TestDeleteAvailabilitySets/returns_error_when_delete_fails
=== PAUSE TestDeleteAvailabilitySets/returns_error_when_delete_fails
=== CONT  TestDeleteAvailabilitySets/deletes_availability_set
=== CONT  TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404
=== CONT  TestDeleteAvailabilitySets/noop_if_availability_set_has_vms
=== CONT  TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false
=== CONT  TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails
I0920 16:06:16.599897   72878 availabilitysets.go:137]  "msg"="deleting availability set"  "availability set"="as-name"
I0920 16:06:16.599898   72878 availabilitysets.go:137]  "msg"="deleting availability set"  "availability set"="as-name"
=== CONT  TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404
I0920 16:06:16.599924   72878 availabilitysets.go:148]  "msg"="successfully delete availability set"  "availability set"="as-name"
=== CONT  TestDeleteAvailabilitySets/returns_error_when_delete_fails
I0920 16:06:16.600047   72878 availabilitysets.go:137]  "msg"="deleting availability set"  "availability set"="as-name"
--- PASS: TestDeleteAvailabilitySets (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_availability_set_has_vms (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404 (0.00s)
    --- PASS: TestDeleteAvailabilitySets/deletes_availability_set (0.00s)
    --- PASS: TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails (0.00s)
    --- PASS: TestDeleteAvailabilitySets/returns_error_when_delete_fails (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404 (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets	3.508s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets/mock_availabilitysets	[no test files]
=== RUN   TestReconcileBastionHosts
=== RUN   TestReconcileBastionHosts/fail_to_get_subnets
=== PAUSE TestReconcileBastionHosts/fail_to_get_subnets
=== RUN   TestReconcileBastionHosts/fail_to_get_publicip
=== PAUSE TestReconcileBastionHosts/fail_to_get_publicip
=== RUN   TestReconcileBastionHosts/create_publicip_fails
=== PAUSE TestReconcileBastionHosts/create_publicip_fails
=== RUN   TestReconcileBastionHosts/fails_to_get_a_created_publicip
=== PAUSE TestReconcileBastionHosts/fails_to_get_a_created_publicip
=== RUN   TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip
=== PAUSE TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip
=== RUN   TestReconcileBastionHosts/bastion_successfully_created
=== PAUSE TestReconcileBastionHosts/bastion_successfully_created
=== RUN   TestReconcileBastionHosts/fail_to_create_a_bastion
=== PAUSE TestReconcileBastionHosts/fail_to_create_a_bastion
=== CONT  TestReconcileBastionHosts/fail_to_get_subnets
=== CONT  TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip
=== CONT  TestReconcileBastionHosts/fail_to_create_a_bastion
=== CONT  TestReconcileBastionHosts/create_publicip_fails
=== CONT  TestReconcileBastionHosts/fails_to_get_a_created_publicip
=== CONT  TestReconcileBastionHosts/fail_to_get_publicip
=== CONT  TestReconcileBastionHosts/bastion_successfully_created
I0920 16:06:18.640380   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640381   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640380   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640380   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640463   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640493   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640994   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641026   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0920 16:06:18.641040   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641067   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0920 16:06:18.640562   72914 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0920 16:06:18.640817   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641599   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641626   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0920 16:06:18.641630   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0920 16:06:18.640829   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641765   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0920 16:06:18.640838   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641849   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0920 16:06:18.640839   72914 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0920 16:06:18.641947   72914 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
--- PASS: TestReconcileBastionHosts (0.00s)
    --- PASS: TestReconcileBastionHosts/fail_to_get_publicip (0.00s)
    --- PASS: TestReconcileBastionHosts/create_publicip_fails (0.00s)
    --- PASS: TestReconcileBastionHosts/bastion_successfully_created (0.00s)
    --- PASS: TestReconcileBastionHosts/fails_to_get_a_created_publicip (0.00s)
    --- PASS: TestReconcileBastionHosts/fail_to_create_a_bastion (0.00s)
    --- PASS: TestReconcileBastionHosts/fail_to_get_subnets (0.00s)
    --- PASS: TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip (0.00s)
=== RUN   TestDeleteBastionHost
=== RUN   TestDeleteBastionHost/successfully_delete_an_existing_bastion_host
=== PAUSE TestDeleteBastionHost/successfully_delete_an_existing_bastion_host
=== RUN   TestDeleteBastionHost/bastion_host_already_deleted
=== PAUSE TestDeleteBastionHost/bastion_host_already_deleted
=== RUN   TestDeleteBastionHost/bastion_host_deletion_fails
=== PAUSE TestDeleteBastionHost/bastion_host_deletion_fails
=== CONT  TestDeleteBastionHost/successfully_delete_an_existing_bastion_host
=== CONT  TestDeleteBastionHost/bastion_host_deletion_fails
=== CONT  TestDeleteBastionHost/bastion_host_already_deleted
I0920 16:06:18.642580   72914 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I0920 16:06:18.642674   72914 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I0920 16:06:18.642686   72914 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
--- PASS: TestDeleteBastionHost (0.00s)
    --- PASS: TestDeleteBastionHost/successfully_delete_an_existing_bastion_host (0.00s)
    --- PASS: TestDeleteBastionHost/bastion_host_deletion_fails (0.00s)
    --- PASS: TestDeleteBastionHost/bastion_host_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts	2.886s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts/mocks_bastionhosts	[no test files]
=== RUN   TestDeleteDisk
=== RUN   TestDeleteDisk/delete_the_disk
=== PAUSE TestDeleteDisk/delete_the_disk
=== RUN   TestDeleteDisk/disk_already_deleted
=== PAUSE TestDeleteDisk/disk_already_deleted
=== RUN   TestDeleteDisk/error_while_trying_to_delete_the_disk
=== PAUSE TestDeleteDisk/error_while_trying_to_delete_the_disk
=== CONT  TestDeleteDisk/delete_the_disk
=== CONT  TestDeleteDisk/error_while_trying_to_delete_the_disk
=== CONT  TestDeleteDisk/disk_already_deleted
I0920 16:06:19.684026   72917 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-1"
I0920 16:06:19.684046   72917 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-1"
I0920 16:06:19.684327   72917 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-2"
I0920 16:06:19.684056   72917 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-1"
I0920 16:06:19.684341   72917 disks.go:74]  "msg"="successfully deleted disk"  "disk"="my-disk-1"
I0920 16:06:19.684362   72917 disks.go:64]  "msg"="deleting disk"  "disk"="honk-disk"
I0920 16:06:19.684407   72917 disks.go:74]  "msg"="successfully deleted disk"  "disk"="honk-disk"
--- PASS: TestDeleteDisk (0.00s)
    --- PASS: TestDeleteDisk/disk_already_deleted (0.00s)
    --- PASS: TestDeleteDisk/delete_the_disk (0.00s)
    --- PASS: TestDeleteDisk/error_while_trying_to_delete_the_disk (0.00s)
=== RUN   TestDiskSpecs
=== RUN   TestDiskSpecs/only_os_disk
=== PAUSE TestDiskSpecs/only_os_disk
=== RUN   TestDiskSpecs/os_and_data_disks
=== PAUSE TestDiskSpecs/os_and_data_disks
=== RUN   TestDiskSpecs/os_and_multiple_data_disks
=== PAUSE TestDiskSpecs/os_and_multiple_data_disks
=== CONT  TestDiskSpecs/only_os_disk
=== CONT  TestDiskSpecs/os_and_multiple_data_disks
=== CONT  TestDiskSpecs/os_and_data_disks
--- PASS: TestDiskSpecs (0.00s)
    --- PASS: TestDiskSpecs/os_and_multiple_data_disks (0.00s)
    --- PASS: TestDiskSpecs/os_and_data_disks (0.00s)
    --- PASS: TestDiskSpecs/only_os_disk (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks	3.857s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks/mock_disks	[no test files]
=== RUN   TestReconcileGroups
=== RUN   TestReconcileGroups/create_group_succeeds
=== PAUSE TestReconcileGroups/create_group_succeeds
=== RUN   TestReconcileGroups/create_resource_group_fails
=== PAUSE TestReconcileGroups/create_resource_group_fails
=== CONT  TestReconcileGroups/create_group_succeeds
=== CONT  TestReconcileGroups/create_resource_group_fails
I0920 16:06:19.150678   72916 async.go:76]  "msg"="creating resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0920 16:06:19.150678   72916 async.go:76]  "msg"="creating resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0920 16:06:19.150902   72916 async.go:91]  "msg"="successfully created resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
--- PASS: TestReconcileGroups (0.00s)
    --- PASS: TestReconcileGroups/create_group_succeeds (0.00s)
    --- PASS: TestReconcileGroups/create_resource_group_fails (0.00s)
=== RUN   TestDeleteGroups
=== RUN   TestDeleteGroups/long_running_delete_operation_is_done
=== PAUSE TestDeleteGroups/long_running_delete_operation_is_done
=== RUN   TestDeleteGroups/long_running_delete_operation_is_not_done
=== PAUSE TestDeleteGroups/long_running_delete_operation_is_not_done
=== RUN   TestDeleteGroups/resource_group_is_not_managed_by_capz
=== PAUSE TestDeleteGroups/resource_group_is_not_managed_by_capz
=== RUN   TestDeleteGroups/fail_to_check_if_resource_group_is_managed
=== PAUSE TestDeleteGroups/fail_to_check_if_resource_group_is_managed
=== RUN   TestDeleteGroups/resource_group_doesn't_exist
=== PAUSE TestDeleteGroups/resource_group_doesn't_exist
=== RUN   TestDeleteGroups/error_occurs_when_deleting_resource_group
=== PAUSE TestDeleteGroups/error_occurs_when_deleting_resource_group
=== RUN   TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group
=== PAUSE TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group
=== RUN   TestDeleteGroups/delete_the_resource_group_successfully
=== PAUSE TestDeleteGroups/delete_the_resource_group_successfully
=== CONT  TestDeleteGroups/long_running_delete_operation_is_done
=== CONT  TestDeleteGroups/resource_group_doesn't_exist
=== CONT  TestDeleteGroups/fail_to_check_if_resource_group_is_managed
=== CONT  TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group
=== CONT  TestDeleteGroups/delete_the_resource_group_successfully
=== CONT  TestDeleteGroups/long_running_delete_operation_is_not_done
=== CONT  TestDeleteGroups/error_occurs_when_deleting_resource_group
=== CONT  TestDeleteGroups/resource_group_is_not_managed_by_capz
I0920 16:06:19.151453   72916 async.go:107]  "msg"="deleting resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0920 16:06:19.151488   72916 async.go:59]  "msg"="long running operation has completed"  "resource"="test-group" "service"="group"
I0920 16:06:19.151490   72916 groups.go:95]  "msg"="Should not delete resource group in unmanaged mode"
I0920 16:06:19.151497   72916 async.go:107]  "msg"="deleting resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0920 16:06:19.151534   72916 async.go:125]  "msg"="successfully deleted resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0920 16:06:19.151570   72916 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-group" "service"="group"
I0920 16:06:19.151626   72916 async.go:107]  "msg"="deleting resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
--- PASS: TestDeleteGroups (0.00s)
    --- PASS: TestDeleteGroups/fail_to_check_if_resource_group_is_managed (0.00s)
    --- PASS: TestDeleteGroups/resource_group_doesn't_exist (0.00s)
    --- PASS: TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group (0.00s)
    --- PASS: TestDeleteGroups/resource_group_is_not_managed_by_capz (0.00s)
    --- PASS: TestDeleteGroups/long_running_delete_operation_is_done (0.00s)
    --- PASS: TestDeleteGroups/delete_the_resource_group_successfully (0.00s)
    --- PASS: TestDeleteGroups/long_running_delete_operation_is_not_done (0.00s)
    --- PASS: TestDeleteGroups/error_occurs_when_deleting_resource_group (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups	3.349s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups/mock_groups	[no test files]
=== RUN   TestReconcileInboundNATRule
=== RUN   TestReconcileInboundNATRule/NAT_rule_successfully_created
=== PAUSE TestReconcileInboundNATRule/NAT_rule_successfully_created
=== RUN   TestReconcileInboundNATRule/fail_to_get_LB
=== PAUSE TestReconcileInboundNATRule/fail_to_get_LB
=== RUN   TestReconcileInboundNATRule/fail_to_create_NAT_rule
=== PAUSE TestReconcileInboundNATRule/fail_to_create_NAT_rule
=== RUN   TestReconcileInboundNATRule/NAT_rule_already_exists
=== PAUSE TestReconcileInboundNATRule/NAT_rule_already_exists
=== CONT  TestReconcileInboundNATRule/NAT_rule_successfully_created
=== CONT  TestReconcileInboundNATRule/fail_to_create_NAT_rule
=== CONT  TestReconcileInboundNATRule/NAT_rule_already_exists
=== CONT  TestReconcileInboundNATRule/fail_to_get_LB
I0920 16:06:20.762718   72921 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine"
I0920 16:06:20.762732   72921 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine"
I0920 16:06:20.762741   72921 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine"
I0920 16:06:20.762742   72921 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine-nat-rule"
I0920 16:06:20.763565   72921 inboundnatrules.go:149]  "msg"="Found available port"  "port"=22
I0920 16:06:20.763557   72921 inboundnatrules.go:143]  "msg"="Found available port"  "port"=2202
I0920 16:06:20.763588   72921 inboundnatrules.go:96]  "msg"="Creating rule %s using port %d"  "NAT rule"="my-machine" "port"=22
I0920 16:06:20.763602   72921 inboundnatrules.go:129]  "msg"="NAT rule already exists"  "NAT rule"="my-machine-nat-rule"
I0920 16:06:20.763612   72921 inboundnatrules.go:96]  "msg"="Creating rule %s using port %d"  "NAT rule"="my-machine" "port"=2202
I0920 16:06:20.763621   72921 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-other-nat-rule"
I0920 16:06:20.763631   72921 inboundnatrules.go:103]  "msg"="successfully created inbound NAT rule"  "NAT rule"="my-machine"
I0920 16:06:20.763646   72921 inboundnatrules.go:149]  "msg"="Found available port"  "port"=22
I0920 16:06:20.763673   72921 inboundnatrules.go:96]  "msg"="Creating rule %s using port %d"  "NAT rule"="my-other-nat-rule" "port"=22
I0920 16:06:20.763700   72921 inboundnatrules.go:103]  "msg"="successfully created inbound NAT rule"  "NAT rule"="my-other-nat-rule"
--- PASS: TestReconcileInboundNATRule (0.00s)
    --- PASS: TestReconcileInboundNATRule/fail_to_get_LB (0.00s)
    --- PASS: TestReconcileInboundNATRule/NAT_rule_successfully_created (0.00s)
    --- PASS: TestReconcileInboundNATRule/fail_to_create_NAT_rule (0.00s)
    --- PASS: TestReconcileInboundNATRule/NAT_rule_already_exists (0.00s)
=== RUN   TestDeleteNetworkInterface
=== RUN   TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule
=== PAUSE TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule
=== RUN   TestDeleteNetworkInterface/NAT_rule_already_deleted
=== PAUSE TestDeleteNetworkInterface/NAT_rule_already_deleted
=== RUN   TestDeleteNetworkInterface/NAT_rule_deletion_fails
=== PAUSE TestDeleteNetworkInterface/NAT_rule_deletion_fails
=== CONT  TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule
=== CONT  TestDeleteNetworkInterface/NAT_rule_deletion_fails
=== CONT  TestDeleteNetworkInterface/NAT_rule_already_deleted
I0920 16:06:20.763964   72921 inboundnatrules.go:114]  "msg"="deleting inbound NAT rule"  "NAT rule"="azure-md-0"
I0920 16:06:20.763992   72921 inboundnatrules.go:120]  "msg"="successfully deleted inbound NAT rule"  "NAT rule"="azure-md-0"
I0920 16:06:20.764043   72921 inboundnatrules.go:114]  "msg"="deleting inbound NAT rule"  "NAT rule"="azure-md-1"
I0920 16:06:20.764067   72921 inboundnatrules.go:114]  "msg"="deleting inbound NAT rule"  "NAT rule"="azure-md-2"
I0920 16:06:20.764079   72921 inboundnatrules.go:120]  "msg"="successfully deleted inbound NAT rule"  "NAT rule"="azure-md-1"
--- PASS: TestDeleteNetworkInterface (0.00s)
    --- PASS: TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule (0.00s)
    --- PASS: TestDeleteNetworkInterface/NAT_rule_already_deleted (0.00s)
    --- PASS: TestDeleteNetworkInterface/NAT_rule_deletion_fails (0.00s)
=== RUN   TestNatRuleExists
=== RUN   TestNatRuleExists/Rule_exists
=== PAUSE TestNatRuleExists/Rule_exists
=== RUN   TestNatRuleExists/Rule_doesn't_exist
=== PAUSE TestNatRuleExists/Rule_doesn't_exist
=== RUN   TestNatRuleExists/No_rules_exist
=== PAUSE TestNatRuleExists/No_rules_exist
=== CONT  TestNatRuleExists/Rule_exists
=== CONT  TestNatRuleExists/No_rules_exist
=== CONT  TestNatRuleExists/Rule_doesn't_exist
I0920 16:06:20.764306   72921 inboundnatrules.go:129]  "msg"="NAT rule already exists"  "NAT rule"="my-rule"
--- PASS: TestNatRuleExists (0.00s)
    --- PASS: TestNatRuleExists/No_rules_exist (0.00s)
    --- PASS: TestNatRuleExists/Rule_exists (0.00s)
    --- PASS: TestNatRuleExists/Rule_doesn't_exist (0.00s)
=== RUN   TestGetAvailablePort
=== RUN   TestGetAvailablePort/Empty_ports
=== PAUSE TestGetAvailablePort/Empty_ports
=== RUN   TestGetAvailablePort/22_taken
=== PAUSE TestGetAvailablePort/22_taken
=== RUN   TestGetAvailablePort/Existing_ports
=== PAUSE TestGetAvailablePort/Existing_ports
=== RUN   TestGetAvailablePort/No_ports_available
=== PAUSE TestGetAvailablePort/No_ports_available
=== CONT  TestGetAvailablePort/Empty_ports
=== CONT  TestGetAvailablePort/Existing_ports
=== CONT  TestGetAvailablePort/22_taken
=== CONT  TestGetAvailablePort/No_ports_available
I0920 16:06:20.764540   72921 inboundnatrules.go:149]  "msg"="Found available port"  "port"=22
I0920 16:06:20.764559   72921 inboundnatrules.go:143]  "msg"="Found available port"  "port"=2203
I0920 16:06:20.764572   72921 inboundnatrules.go:143]  "msg"="Found available port"  "port"=2201
--- PASS: TestGetAvailablePort (0.00s)
    --- PASS: TestGetAvailablePort/Empty_ports (0.00s)
    --- PASS: TestGetAvailablePort/No_ports_available (0.00s)
    --- PASS: TestGetAvailablePort/Existing_ports (0.00s)
    --- PASS: TestGetAvailablePort/22_taken (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules	4.786s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules/mock_inboundnatrules	[no test files]
=== RUN   TestReconcileLoadBalancer
=== RUN   TestReconcileLoadBalancer/fail_to_create_a_public_LB
=== PAUSE TestReconcileLoadBalancer/fail_to_create_a_public_LB
=== RUN   TestReconcileLoadBalancer/create_public_apiserver_LB
=== PAUSE TestReconcileLoadBalancer/create_public_apiserver_LB
=== RUN   TestReconcileLoadBalancer/create_internal_apiserver_LB
=== PAUSE TestReconcileLoadBalancer/create_internal_apiserver_LB
=== RUN   TestReconcileLoadBalancer/create_node_outbound_LB
=== PAUSE TestReconcileLoadBalancer/create_node_outbound_LB
=== RUN   TestReconcileLoadBalancer/create_multiple_LBs
=== PAUSE TestReconcileLoadBalancer/create_multiple_LBs
=== RUN   TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates
=== PAUSE TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates
=== RUN   TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties
=== PAUSE TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties
=== CONT  TestReconcileLoadBalancer/fail_to_create_a_public_LB
=== CONT  TestReconcileLoadBalancer/create_multiple_LBs
=== CONT  TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties
=== CONT  TestReconcileLoadBalancer/create_internal_apiserver_LB
=== CONT  TestReconcileLoadBalancer/create_public_apiserver_LB
=== CONT  TestReconcileLoadBalancer/create_node_outbound_LB
=== CONT  TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates
I0920 16:06:20.204227   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-publiclb"
I0920 16:06:20.204242   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-private-lb"
I0920 16:06:20.204252   72920 loadbalancers.go:86]  "msg"="found existing load balancer, checking if updates are needed"  "load balancer"="my-publiclb"
I0920 16:06:20.204261   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-lb"
I0920 16:06:20.204272   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-publiclb"
I0920 16:06:20.204335   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-cluster"
I0920 16:06:20.204367   72920 loadbalancers.go:86]  "msg"="found existing load balancer, checking if updates are needed"  "load balancer"="my-publiclb"
I0920 16:06:20.204598   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-lb"
I0920 16:06:20.204636   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-lb-2"
I0920 16:06:20.204659   72920 loadbalancers.go:135]  "msg"="LB exists and no defaults are missing, skipping update"  "load balancer"="my-publiclb"
I0920 16:06:20.204696   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-lb-2"
I0920 16:06:20.204723   72920 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-lb-3"
I0920 16:06:20.204764   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-lb-3"
I0920 16:06:20.204841   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-private-lb"
I0920 16:06:20.204863   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-cluster"
I0920 16:06:20.204914   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-publiclb"
I0920 16:06:20.204934   72920 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-publiclb"
--- PASS: TestReconcileLoadBalancer (0.00s)
    --- PASS: TestReconcileLoadBalancer/fail_to_create_a_public_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_multiple_LBs (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_internal_apiserver_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_node_outbound_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_public_apiserver_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties (0.00s)
=== RUN   TestDeleteLoadBalancer
=== RUN   TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer
=== PAUSE TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer
=== RUN   TestDeleteLoadBalancer/load_balancer_already_deleted
=== PAUSE TestDeleteLoadBalancer/load_balancer_already_deleted
=== RUN   TestDeleteLoadBalancer/load_balancer_deletion_fails
=== PAUSE TestDeleteLoadBalancer/load_balancer_deletion_fails
=== CONT  TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer
=== CONT  TestDeleteLoadBalancer/load_balancer_deletion_fails
=== CONT  TestDeleteLoadBalancer/load_balancer_already_deleted
I0920 16:06:20.205274   72920 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-internallb"
I0920 16:06:20.205275   72920 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-publiclb"
I0920 16:06:20.205281   72920 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-publiclb"
I0920 16:06:20.205302   72920 loadbalancers.go:193]  "msg"="deleted public load balancer"  "load balancer"="my-internallb"
I0920 16:06:20.205320   72920 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-publiclb"
I0920 16:06:20.205342   72920 loadbalancers.go:193]  "msg"="deleted public load balancer"  "load balancer"="my-publiclb"
--- PASS: TestDeleteLoadBalancer (0.00s)
    --- PASS: TestDeleteLoadBalancer/load_balancer_already_deleted (0.00s)
    --- PASS: TestDeleteLoadBalancer/load_balancer_deletion_fails (0.00s)
    --- PASS: TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers	4.229s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers/mock_loadbalancers	[no test files]
=== RUN   TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Canceled
=== RUN   TestReconcile/managedcluster_in_terminal_provisioning_state
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Succeeded
=== RUN   TestReconcile/managedcluster_in_terminal_provisioning_state#01
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Failed
=== RUN   TestReconcile/managedcluster_in_terminal_provisioning_state#02
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Deleting
=== RUN   TestReconcile/managedcluster_in_nonterminal_provisioning_state
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: InProgress
=== RUN   TestReconcile/managedcluster_in_nonterminal_provisioning_state#01
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: randomStringHere
=== RUN   TestReconcile/managedcluster_in_nonterminal_provisioning_state#02
=== CONT  TestReconcile
    managedclusters_test.go:146: Testing no managedcluster exists
=== RUN   TestReconcile/no_managedcluster_exists
--- PASS: TestReconcile (0.00s)
    --- PASS: TestReconcile/managedcluster_in_terminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/managedcluster_in_terminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/managedcluster_in_terminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/managedcluster_in_nonterminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/managedcluster_in_nonterminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/managedcluster_in_nonterminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/no_managedcluster_exists (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters	1.453s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters/mock_managedclusters	[no test files]
=== RUN   TestReconcileNatGateways
=== RUN   TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode
=== PAUSE TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode
=== RUN   TestReconcileNatGateways/nat_gateway_create_successfully
=== PAUSE TestReconcileNatGateways/nat_gateway_create_successfully
=== RUN   TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state
=== PAUSE TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state
=== RUN   TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date
=== PAUSE TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date
=== RUN   TestReconcileNatGateways/fail_when_getting_existing_nat_gateway
=== PAUSE TestReconcileNatGateways/fail_when_getting_existing_nat_gateway
=== RUN   TestReconcileNatGateways/fail_to_create_a_nat_gateway
=== PAUSE TestReconcileNatGateways/fail_to_create_a_nat_gateway
=== CONT  TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode
=== CONT  TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date
=== CONT  TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state
=== CONT  TestReconcileNatGateways/fail_to_create_a_nat_gateway
=== CONT  TestReconcileNatGateways/fail_when_getting_existing_nat_gateway
=== CONT  TestReconcileNatGateways/nat_gateway_create_successfully
I0920 16:06:11.800772   72763 natgateways.go:62]  "msg"="Skipping nat gateways reconcile in custom vnet mode"
I0920 16:06:11.800973   72763 natgateways.go:74]  "msg"="nat gateway already exists"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.801437   72763 natgateways.go:84]  "msg"="updating NAT gateway IP name to match the spec"  "desired name"="different-pip-name" "old name"="pip-my-node-natgateway-node-subnet-natgw"
I0920 16:06:11.801474   72763 natgateways.go:106]  "msg"="successfully created nat gateway"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.801011   72763 natgateways.go:74]  "msg"="nat gateway already exists"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.801543   72763 natgateways.go:79]  "msg"="Nat Gateway exists with expected values, skipping update"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.801038   72763 natgateways.go:88]  "msg"="nat gateway doesn't exist yet, creating it"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.801179   72763 natgateways.go:88]  "msg"="nat gateway doesn't exist yet, creating it"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.801666   72763 natgateways.go:106]  "msg"="successfully created nat gateway"  "nat gateway"="my-node-natgateway"
--- PASS: TestReconcileNatGateways (0.00s)
    --- PASS: TestReconcileNatGateways/fail_when_getting_existing_nat_gateway (0.00s)
    --- PASS: TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode (0.00s)
    --- PASS: TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state (0.00s)
    --- PASS: TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date (0.00s)
    --- PASS: TestReconcileNatGateways/fail_to_create_a_nat_gateway (0.00s)
    --- PASS: TestReconcileNatGateways/nat_gateway_create_successfully (0.00s)
=== RUN   TestDeleteNatGateway
=== RUN   TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode
=== PAUSE TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode
=== RUN   TestDeleteNatGateway/nat_gateway_deleted_successfully
=== PAUSE TestDeleteNatGateway/nat_gateway_deleted_successfully
=== RUN   TestDeleteNatGateway/nat_gateway_already_deleted
=== PAUSE TestDeleteNatGateway/nat_gateway_already_deleted
=== RUN   TestDeleteNatGateway/nat_gateway_deletion_fails
=== PAUSE TestDeleteNatGateway/nat_gateway_deletion_fails
=== CONT  TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode
=== CONT  TestDeleteNatGateway/nat_gateway_already_deleted
I0920 16:06:11.801896   72763 natgateways.go:156]  "msg"="Skipping nat gateway deletion in custom vnet mode"
=== CONT  TestDeleteNatGateway/nat_gateway_deleted_successfully
I0920 16:06:11.801938   72763 natgateways.go:160]  "msg"="deleting nat gateway"  "nat gateway"="my-node-natgateway"
=== CONT  TestDeleteNatGateway/nat_gateway_deletion_fails
I0920 16:06:11.801995   72763 natgateways.go:160]  "msg"="deleting nat gateway"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.802019   72763 natgateways.go:170]  "msg"="successfully deleted nat gateway"  "nat gateway"="my-node-natgateway"
I0920 16:06:11.802053   72763 natgateways.go:160]  "msg"="deleting nat gateway"  "nat gateway"="my-node-natgateway"
--- PASS: TestDeleteNatGateway (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateway_already_deleted (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateway_deleted_successfully (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateway_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways	2.877s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways/mock_natgateways	[no test files]
=== RUN   TestReconcileNetworkInterface
=== RUN   TestReconcileNetworkInterface/network_interface_already_exists
=== PAUSE TestReconcileNetworkInterface/network_interface_already_exists
=== RUN   TestReconcileNetworkInterface/node_network_interface_create_fails
=== PAUSE TestReconcileNetworkInterface/node_network_interface_create_fails
=== RUN   TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created
=== PAUSE TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created
=== RUN   TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created
=== PAUSE TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created
=== RUN   TestReconcileNetworkInterface/control_plane_network_interface_successfully_created
=== PAUSE TestReconcileNetworkInterface/control_plane_network_interface_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created
=== PAUSE TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created
=== PAUSE TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created
=== PAUSE TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully
=== PAUSE TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully
=== CONT  TestReconcileNetworkInterface/network_interface_already_exists
=== CONT  TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created
=== CONT  TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully
=== CONT  TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created
=== CONT  TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created
=== CONT  TestReconcileNetworkInterface/control_plane_network_interface_successfully_created
=== CONT  TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created
=== CONT  TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created
=== CONT  TestReconcileNetworkInterface/node_network_interface_create_fails
I0920 16:06:21.298352   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-public-net-interface"
I0920 16:06:21.298596   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0920 16:06:21.298650   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0920 16:06:21.298673   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0920 16:06:21.298656   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0920 16:06:21.298748   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0920 16:06:21.298843   72924 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
--- PASS: TestReconcileNetworkInterface (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_already_exists (0.00s)
    --- PASS: TestReconcileNetworkInterface/node_network_interface_create_fails (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully (0.00s)
    --- PASS: TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/control_plane_network_interface_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created (0.00s)
=== RUN   TestDeleteNetworkInterface
=== RUN   TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface
=== PAUSE TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface
=== RUN   TestDeleteNetworkInterface/network_interface_already_deleted
=== PAUSE TestDeleteNetworkInterface/network_interface_already_deleted
=== RUN   TestDeleteNetworkInterface/network_interface_deletion_fails
=== PAUSE TestDeleteNetworkInterface/network_interface_deletion_fails
=== CONT  TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface
=== CONT  TestDeleteNetworkInterface/network_interface_deletion_fails
=== CONT  TestDeleteNetworkInterface/network_interface_already_deleted
I0920 16:06:21.300701   72924 networkinterfaces.go:170]  "msg"="deleting network interface %s"  "network interface"="my-net-interface"
I0920 16:06:21.300718   72924 networkinterfaces.go:170]  "msg"="deleting network interface %s"  "network interface"="my-net-interface"
I0920 16:06:21.300734   72924 networkinterfaces.go:170]  "msg"="deleting network interface %s"  "network interface"="my-net-interface"
I0920 16:06:21.300739   72924 networkinterfaces.go:175]  "msg"="successfully deleted NIC"  "network interface"="my-net-interface"
I0920 16:06:21.300767   72924 networkinterfaces.go:175]  "msg"="successfully deleted NIC"  "network interface"="my-net-interface"
--- PASS: TestDeleteNetworkInterface (0.00s)
    --- PASS: TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface (0.00s)
    --- PASS: TestDeleteNetworkInterface/network_interface_deletion_fails (0.00s)
    --- PASS: TestDeleteNetworkInterface/network_interface_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces	4.881s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces/mock_networkinterfaces	[no test files]
=== RUN   TestReconcilePrivateDNS
=== RUN   TestReconcilePrivateDNS/no_private_dns
=== PAUSE TestReconcilePrivateDNS/no_private_dns
=== RUN   TestReconcilePrivateDNS/create_ipv4_private_dns_successfully
=== PAUSE TestReconcilePrivateDNS/create_ipv4_private_dns_successfully
=== RUN   TestReconcilePrivateDNS/create_ipv6_private_dns_successfully
=== PAUSE TestReconcilePrivateDNS/create_ipv6_private_dns_successfully
=== RUN   TestReconcilePrivateDNS/link_creation_fails
=== PAUSE TestReconcilePrivateDNS/link_creation_fails
=== CONT  TestReconcilePrivateDNS/no_private_dns
=== CONT  TestReconcilePrivateDNS/create_ipv6_private_dns_successfully
=== CONT  TestReconcilePrivateDNS/create_ipv4_private_dns_successfully
=== CONT  TestReconcilePrivateDNS/link_creation_fails
I0920 16:06:21.806433   72939 privatedns.go:61]  "msg"="creating private DNS zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.806435   72939 privatedns.go:61]  "msg"="creating private DNS zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.806455   72939 privatedns.go:61]  "msg"="creating private DNS zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.806690   72939 privatedns.go:66]  "msg"="successfully created private DNS zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.806701   72939 privatedns.go:66]  "msg"="successfully created private DNS zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.806714   72939 privatedns.go:66]  "msg"="successfully created private DNS zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.806718   72939 privatedns.go:69]  "msg"="creating a virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.806720   72939 privatedns.go:69]  "msg"="creating a virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.806734   72939 privatedns.go:69]  "msg"="creating a virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.806763   72939 privatedns.go:83]  "msg"="successfully created virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.806776   72939 privatedns.go:83]  "msg"="successfully created virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.806785   72939 privatedns.go:87]  "msg"="creating record set"  "private dns zone"="my-dns-zone" "record"="hostname-2"
I0920 16:06:21.806796   72939 privatedns.go:87]  "msg"="creating record set"  "private dns zone"="my-dns-zone" "record"="hostname-1"
I0920 16:06:21.806817   72939 privatedns.go:107]  "msg"="successfully created record set"  "private dns zone"="my-dns-zone" "record"="hostname-2"
I0920 16:06:21.806825   72939 privatedns.go:107]  "msg"="successfully created record set"  "private dns zone"="my-dns-zone" "record"="hostname-1"
--- PASS: TestReconcilePrivateDNS (0.00s)
    --- PASS: TestReconcilePrivateDNS/no_private_dns (0.00s)
    --- PASS: TestReconcilePrivateDNS/link_creation_fails (0.00s)
    --- PASS: TestReconcilePrivateDNS/create_ipv6_private_dns_successfully (0.00s)
    --- PASS: TestReconcilePrivateDNS/create_ipv4_private_dns_successfully (0.00s)
=== RUN   TestDeletePrivateDNS
=== RUN   TestDeletePrivateDNS/no_private_dns
=== PAUSE TestDeletePrivateDNS/no_private_dns
=== RUN   TestDeletePrivateDNS/delete_the_dns_zone
=== PAUSE TestDeletePrivateDNS/delete_the_dns_zone
=== RUN   TestDeletePrivateDNS/link_already_deleted
=== PAUSE TestDeletePrivateDNS/link_already_deleted
=== RUN   TestDeletePrivateDNS/zone_already_deleted
=== PAUSE TestDeletePrivateDNS/zone_already_deleted
=== RUN   TestDeletePrivateDNS/error_while_trying_to_delete_the_link
=== PAUSE TestDeletePrivateDNS/error_while_trying_to_delete_the_link
=== RUN   TestDeletePrivateDNS/error_while_trying_to_delete_the_zone
=== PAUSE TestDeletePrivateDNS/error_while_trying_to_delete_the_zone
=== CONT  TestDeletePrivateDNS/no_private_dns
=== CONT  TestDeletePrivateDNS/zone_already_deleted
=== CONT  TestDeletePrivateDNS/link_already_deleted
=== CONT  TestDeletePrivateDNS/delete_the_dns_zone
=== CONT  TestDeletePrivateDNS/error_while_trying_to_delete_the_link
=== CONT  TestDeletePrivateDNS/error_while_trying_to_delete_the_zone
I0920 16:06:21.807141   72939 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.807144   72939 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.807172   72939 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.807184   72939 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.807207   72939 privatedns.go:137]  "msg"="successfully deleted private dns zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.807215   72939 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.807244   72939 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.807268   72939 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.807296   72939 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0920 16:06:21.807304   72939 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0920 16:06:21.807336   72939 privatedns.go:137]  "msg"="successfully deleted private dns zone"  "private dns zone"="my-dns-zone"
--- PASS: TestDeletePrivateDNS (0.00s)
    --- PASS: TestDeletePrivateDNS/no_private_dns (0.00s)
    --- PASS: TestDeletePrivateDNS/zone_already_deleted (0.00s)
    --- PASS: TestDeletePrivateDNS/link_already_deleted (0.00s)
    --- PASS: TestDeletePrivateDNS/error_while_trying_to_delete_the_zone (0.00s)
    --- PASS: TestDeletePrivateDNS/error_while_trying_to_delete_the_link (0.00s)
    --- PASS: TestDeletePrivateDNS/delete_the_dns_zone (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns	4.145s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns/mock_privatedns	[no test files]
=== RUN   TestReconcilePublicIP
=== RUN   TestReconcilePublicIP/can_create_public_IPs
=== PAUSE TestReconcilePublicIP/can_create_public_IPs
=== RUN   TestReconcilePublicIP/fail_to_create_a_public_IP
=== PAUSE TestReconcilePublicIP/fail_to_create_a_public_IP
=== CONT  TestReconcilePublicIP/can_create_public_IPs
=== CONT  TestReconcilePublicIP/fail_to_create_a_public_IP
I0920 16:06:22.246062   72945 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip"
I0920 16:06:22.246067   72945 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip"
I0920 16:06:22.246459   72945 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip"
I0920 16:06:22.246474   72945 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.246519   72945 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.246531   72945 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip-3"
I0920 16:06:22.246579   72945 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip-3"
I0920 16:06:22.246593   72945 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip-ipv6"
I0920 16:06:22.246636   72945 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip-ipv6"
--- PASS: TestReconcilePublicIP (0.00s)
    --- PASS: TestReconcilePublicIP/fail_to_create_a_public_IP (0.00s)
    --- PASS: TestReconcilePublicIP/can_create_public_IPs (0.00s)
=== RUN   TestDeletePublicIP
=== RUN   TestDeletePublicIP/successfully_delete_two_existing_public_IP
=== PAUSE TestDeletePublicIP/successfully_delete_two_existing_public_IP
=== RUN   TestDeletePublicIP/public_ip_already_deleted
=== PAUSE TestDeletePublicIP/public_ip_already_deleted
=== RUN   TestDeletePublicIP/public_ip_deletion_fails
=== PAUSE TestDeletePublicIP/public_ip_deletion_fails
=== RUN   TestDeletePublicIP/skip_unmanaged_public_ip_deletion
=== PAUSE TestDeletePublicIP/skip_unmanaged_public_ip_deletion
=== CONT  TestDeletePublicIP/successfully_delete_two_existing_public_IP
=== CONT  TestDeletePublicIP/public_ip_deletion_fails
=== CONT  TestDeletePublicIP/public_ip_already_deleted
=== CONT  TestDeletePublicIP/skip_unmanaged_public_ip_deletion
I0920 16:06:22.246878   72945 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip"
I0920 16:06:22.246894   72945 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip"
I0920 16:06:22.246918   72945 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip"
I0920 16:06:22.246941   72945 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.246961   72945 publicips.go:122]  "msg"="Skipping IP deletion for unmanaged public IP"  "public ip"="my-publicip"
I0920 16:06:22.246961   72945 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.246978   72945 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.246980   72945 publicips.go:122]  "msg"="Skipping IP deletion for unmanaged public IP"  "public ip"="my-publicip"
I0920 16:06:22.246994   72945 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.247019   72945 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip-2"
I0920 16:06:22.247040   72945 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip-2"
--- PASS: TestDeletePublicIP (0.00s)
    --- PASS: TestDeletePublicIP/public_ip_deletion_fails (0.00s)
    --- PASS: TestDeletePublicIP/successfully_delete_two_existing_public_IP (0.00s)
    --- PASS: TestDeletePublicIP/public_ip_already_deleted (0.00s)
    --- PASS: TestDeletePublicIP/skip_unmanaged_public_ip_deletion (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips	3.970s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips/mock_publicips	[no test files]
=== RUN   TestCacheGet
=== RUN   TestCacheGet/should_find
=== PAUSE TestCacheGet/should_find
=== RUN   TestCacheGet/should_not_find
=== PAUSE TestCacheGet/should_not_find
=== CONT  TestCacheGet/should_find
=== CONT  TestCacheGet/should_not_find
--- PASS: TestCacheGet (0.00s)
    --- PASS: TestCacheGet/should_find (0.00s)
    --- PASS: TestCacheGet/should_not_find (0.00s)
=== RUN   TestCacheGetZones
=== RUN   TestCacheGetZones/should_find_1_result
=== PAUSE TestCacheGetZones/should_find_1_result
=== RUN   TestCacheGetZones/should_find_2_results
=== PAUSE TestCacheGetZones/should_find_2_results
=== RUN   TestCacheGetZones/should_not_find_due_to_location_mismatch
=== PAUSE TestCacheGetZones/should_not_find_due_to_location_mismatch
=== RUN   TestCacheGetZones/should_not_find_due_to_location_restriction
=== PAUSE TestCacheGetZones/should_not_find_due_to_location_restriction
=== RUN   TestCacheGetZones/should_not_find_due_to_zone_restriction
=== PAUSE TestCacheGetZones/should_not_find_due_to_zone_restriction
=== CONT  TestCacheGetZones/should_find_1_result
=== CONT  TestCacheGetZones/should_not_find_due_to_zone_restriction
=== CONT  TestCacheGetZones/should_find_2_results
=== CONT  TestCacheGetZones/should_not_find_due_to_location_mismatch
=== CONT  TestCacheGetZones/should_not_find_due_to_location_restriction
--- PASS: TestCacheGetZones (0.00s)
    --- PASS: TestCacheGetZones/should_not_find_due_to_location_mismatch (0.00s)
    --- PASS: TestCacheGetZones/should_not_find_due_to_zone_restriction (0.00s)
    --- PASS: TestCacheGetZones/should_find_1_result (0.00s)
    --- PASS: TestCacheGetZones/should_find_2_results (0.00s)
    --- PASS: TestCacheGetZones/should_not_find_due_to_location_restriction (0.00s)
=== RUN   TestCacheGetZonesWithVMSize
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction
=== RUN   TestCacheGetZonesWithVMSize/should_find_1_result
=== PAUSE TestCacheGetZonesWithVMSize/should_find_1_result
=== RUN   TestCacheGetZonesWithVMSize/should_find_2_results
=== PAUSE TestCacheGetZonesWithVMSize/should_find_2_results
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction
=== CONT  TestCacheGetZonesWithVMSize/should_find_2_results
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction
=== CONT  TestCacheGetZonesWithVMSize/should_find_1_result
--- PASS: TestCacheGetZonesWithVMSize (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_find_2_results (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_find_1_result (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus	1.850s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus/mock_resourceskus	[no test files]
=== RUN   TestReconcileRoleAssignmentsVM
=== RUN   TestReconcileRoleAssignmentsVM/create_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVM/create_a_role_assignment
=== RUN   TestReconcileRoleAssignmentsVM/error_getting_VM
=== PAUSE TestReconcileRoleAssignmentsVM/error_getting_VM
=== RUN   TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVM/create_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVM/error_getting_VM
I0920 16:06:22.668270   72952 roleassignments.go:94]  "msg"="successfully created role assignment for generated Identity for VM"  "virtual machine"="test-vm"
--- PASS: TestReconcileRoleAssignmentsVM (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVM/error_getting_VM (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVM/create_a_role_assignment (0.00s)
=== RUN   TestReconcileRoleAssignmentsVMSS
=== RUN   TestReconcileRoleAssignmentsVMSS/create_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVMSS/create_a_role_assignment
=== RUN   TestReconcileRoleAssignmentsVMSS/error_getting_VMSS
=== PAUSE TestReconcileRoleAssignmentsVMSS/error_getting_VMSS
=== RUN   TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVMSS/create_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVMSS/error_getting_VMSS
I0920 16:06:22.668650   72952 roleassignments.go:113]  "msg"="successfully created role assignment for generated Identity for VMSS"  "virtual machine scale set"="test-vmss"
--- PASS: TestReconcileRoleAssignmentsVMSS (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVMSS/create_a_role_assignment (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVMSS/error_getting_VMSS (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments	3.893s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments/mock_roleassignments	[no test files]
=== RUN   TestReconcileRouteTables
=== RUN   TestReconcileRouteTables/route_tables_in_custom_vnet_mode
=== PAUSE TestReconcileRouteTables/route_tables_in_custom_vnet_mode
=== RUN   TestReconcileRouteTables/route_table_create_successfully
=== PAUSE TestReconcileRouteTables/route_table_create_successfully
=== RUN   TestReconcileRouteTables/do_not_create_route_table_if_already_exists
=== PAUSE TestReconcileRouteTables/do_not_create_route_table_if_already_exists
=== RUN   TestReconcileRouteTables/fail_when_getting_existing_route_table
=== PAUSE TestReconcileRouteTables/fail_when_getting_existing_route_table
=== RUN   TestReconcileRouteTables/fail_to_create_a_route_table
=== PAUSE TestReconcileRouteTables/fail_to_create_a_route_table
=== CONT  TestReconcileRouteTables/route_tables_in_custom_vnet_mode
=== CONT  TestReconcileRouteTables/fail_when_getting_existing_route_table
=== CONT  TestReconcileRouteTables/fail_to_create_a_route_table
=== CONT  TestReconcileRouteTables/do_not_create_route_table_if_already_exists
=== CONT  TestReconcileRouteTables/route_table_create_successfully
I0920 16:06:23.099764   72958 routetables.go:60]  "msg"="Skipping route tables reconcile in custom vnet mode"
I0920 16:06:23.099879   72958 routetables.go:80]  "msg"="creating Route Table"  "route table"="my-cp-routetable"
I0920 16:06:23.099908   72958 routetables.go:80]  "msg"="creating Route Table"  "route table"="my-cp-routetable"
I0920 16:06:23.100008   72958 routetables.go:93]  "msg"="successfully created route table"  "route table"="my-cp-routetable"
I0920 16:06:23.100044   72958 routetables.go:80]  "msg"="creating Route Table"  "route table"="my-node-routetable"
I0920 16:06:23.100073   72958 routetables.go:93]  "msg"="successfully created route table"  "route table"="my-node-routetable"
--- PASS: TestReconcileRouteTables (0.00s)
    --- PASS: TestReconcileRouteTables/fail_when_getting_existing_route_table (0.00s)
    --- PASS: TestReconcileRouteTables/do_not_create_route_table_if_already_exists (0.00s)
    --- PASS: TestReconcileRouteTables/route_tables_in_custom_vnet_mode (0.00s)
    --- PASS: TestReconcileRouteTables/fail_to_create_a_route_table (0.00s)
    --- PASS: TestReconcileRouteTables/route_table_create_successfully (0.00s)
=== RUN   TestDeleteRouteTable
=== RUN   TestDeleteRouteTable/route_tables_in_custom_vnet_mode
=== PAUSE TestDeleteRouteTable/route_tables_in_custom_vnet_mode
=== RUN   TestDeleteRouteTable/route_table_deleted_successfully
=== PAUSE TestDeleteRouteTable/route_table_deleted_successfully
=== RUN   TestDeleteRouteTable/route_table_already_deleted
=== PAUSE TestDeleteRouteTable/route_table_already_deleted
=== RUN   TestDeleteRouteTable/route_table_deletion_fails
=== PAUSE TestDeleteRouteTable/route_table_deletion_fails
=== CONT  TestDeleteRouteTable/route_tables_in_custom_vnet_mode
=== CONT  TestDeleteRouteTable/route_table_already_deleted
=== CONT  TestDeleteRouteTable/route_table_deletion_fails
=== CONT  TestDeleteRouteTable/route_table_deleted_successfully
I0920 16:06:23.100336   72958 routetables.go:104]  "msg"="Skipping route table deletion in custom vnet mode"
I0920 16:06:23.100376   72958 routetables.go:108]  "msg"="deleting route table"  "route table"="my-cp-routetable"
I0920 16:06:23.100387   72958 routetables.go:108]  "msg"="deleting route table"  "route table"="my-cp-routetable"
I0920 16:06:23.100400   72958 routetables.go:108]  "msg"="deleting route table"  "route table"="my-node-routetable"
I0920 16:06:23.100407   72958 routetables.go:108]  "msg"="deleting route table"  "route table"="my-cp-routetable"
I0920 16:06:23.100410   72958 routetables.go:118]  "msg"="successfully deleted route table"  "route table"="my-cp-routetable"
I0920 16:06:23.100423   72958 routetables.go:108]  "msg"="deleting route table"  "route table"="my-node-routetable"
I0920 16:06:23.100437   72958 routetables.go:118]  "msg"="successfully deleted route table"  "route table"="my-node-routetable"
--- PASS: TestDeleteRouteTable (0.00s)
    --- PASS: TestDeleteRouteTable/route_tables_in_custom_vnet_mode (0.00s)
    --- PASS: TestDeleteRouteTable/route_table_already_deleted (0.00s)
    --- PASS: TestDeleteRouteTable/route_table_deleted_successfully (0.00s)
    --- PASS: TestDeleteRouteTable/route_table_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables	3.990s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables/mock_routetables	[no test files]
=== RUN   TestNewService
--- PASS: TestNewService (0.00s)
=== RUN   TestGetExistingVMSS
=== RUN   TestGetExistingVMSS/scale_set_not_found
=== PAUSE TestGetExistingVMSS/scale_set_not_found
=== RUN   TestGetExistingVMSS/get_existing_vmss
=== PAUSE TestGetExistingVMSS/get_existing_vmss
=== RUN   TestGetExistingVMSS/list_instances_fails
=== PAUSE TestGetExistingVMSS/list_instances_fails
=== CONT  TestGetExistingVMSS/scale_set_not_found
=== CONT  TestGetExistingVMSS/list_instances_fails
=== CONT  TestGetExistingVMSS/get_existing_vmss
=== CONT  TestGetExistingVMSS/scale_set_not_found
    scalesets_test.go:215: failed to get existing vmss: #: Not found: StatusCode=404
=== CONT  TestGetExistingVMSS/list_instances_fails
    scalesets_test.go:215: failed to list instances: #: Not found: StatusCode=404
--- PASS: TestGetExistingVMSS (0.00s)
    --- PASS: TestGetExistingVMSS/scale_set_not_found (0.00s)
    --- PASS: TestGetExistingVMSS/list_instances_fails (0.00s)
    --- PASS: TestGetExistingVMSS/get_existing_vmss (0.00s)
=== RUN   TestReconcileVMSS
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss
=== RUN   TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done
=== PAUSE TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done
=== RUN   TestReconcileVMSS/Windows_VMSS_should_not_get_patched
=== PAUSE TestReconcileVMSS/Windows_VMSS_should_not_get_patched
=== RUN   TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows
=== PAUSE TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_encryption
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_encryption
=== RUN   TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity
=== PAUSE TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled
=== RUN   TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== PAUSE TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== RUN   TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation
=== PAUSE TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation
=== RUN   TestReconcileVMSS/less_than_2_vCPUs
=== PAUSE TestReconcileVMSS/less_than_2_vCPUs
=== RUN   TestReconcileVMSS/Memory_is_less_than_2Gi
=== PAUSE TestReconcileVMSS/Memory_is_less_than_2Gi
=== RUN   TestReconcileVMSS/failed_to_get_SKU
=== PAUSE TestReconcileVMSS/failed_to_get_SKU
=== RUN   TestReconcileVMSS/fails_with_internal_error
=== PAUSE TestReconcileVMSS/fails_with_internal_error
=== RUN   TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled
=== PAUSE TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled
=== CONT  TestReconcileVMSS/Memory_is_less_than_2Gi
=== CONT  TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation
=== CONT  TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== CONT  TestReconcileVMSS/less_than_2_vCPUs
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price
=== CONT  TestReconcileVMSS/fails_with_internal_error
=== CONT  TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_encryption
=== CONT  TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity
=== CONT  TestReconcileVMSS/Windows_VMSS_should_not_get_patched
=== CONT  TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows
=== CONT  TestReconcileVMSS/failed_to_get_SKU
=== CONT  TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done
I0920 16:06:23.534575   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.534701   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.535231   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.535233   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.535313   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.535329   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.535348   72968 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0920 16:06:23.535854   72968 scalesets.go:263]  "msg"="nothing to update on vmss"  "hasChanges"=false "newReplicas"=2 "oldReplicas"=2 "scale set"="my-vmss"
I0920 16:06:23.535882   72968 scalesets.go:263]  "msg"="nothing to update on vmss"  "hasChanges"=false "newReplicas"=2 "oldReplicas"=2 "scale set"="my-vmss"
I0920 16:06:23.536210   72968 scalesets.go:256]  "msg"="surging..."  "surge"=3
I0920 16:06:23.536287   72968 scalesets.go:267]  "msg"="patching vmss"  "patch"={"properties":{"upgradePolicy":{"mode":"Manual"},"virtualMachineProfile":{"osProfile":{"customData":"fake-bootstrap-data","linuxConfiguration":{"disablePasswordAuthentication":true,"ssh":{"publicKeys":[{"path":"/home/capi/.ssh/authorized_keys","keyData":"fakesshkey\n"}]}}},"storageProfile":{"imageReference":{"offer":"my-offer","publisher":"fake-publisher","sku":"sku-id","version":"2.0"},"osDisk":{"diskSizeGB":120,"managedDisk":{"storageAccountType":"Premium_LRS"}},"dataDisks":[{"name":"my-vmss_my_disk","lun":0,"createOption":"Empty","diskSizeGB":128},{"name":"my-vmss_my_disk_with_managed_disk","lun":1,"createOption":"Empty","diskSizeGB":128,"managedDisk":{"storageAccountType":"Standard_LRS"}},{"name":"my-vmss_managed_disk_with_encryption","lun":2,"createOption":"Empty","diskSizeGB":128,"managedDisk":{"storageAccountType":"Standard_LRS","diskEncryptionSet":{"id":"encryption_id"}}},{"name":"my-vmss_my_disk_with_ultra_disks","lun":3,"createOption":"Empty","diskSizeGB":128,"managedDisk":{"storageAccountType":"UltraSSD_LRS"}}]},"diagnosticsProfile":{"bootDiagnostics":{"enabled":true}},"extensionProfile":{"extensions":[{"name":"someExtension","properties":{"protectedSettings":{"commandToExecute":"echo hello"},"publisher":"somePublisher","type":"someExtension","typeHandlerVersion":"someVersion"}}]}},"overprovision":false,"singlePlacementGroup":false,"additionalCapabilities":{"ultraSSDEnabled":true}},"sku":{"name":"VM_SIZE","tier":"Standard","capacity":3},"tags":{"Name":"my-vmss","sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster":"owned","sigs.k8s.io_cluster-api-provider-azure_role":"node"}} "scale set"="my-vmss"
I0920 16:06:23.536507   72968 scalesets.go:277]  "msg"="successfully started to update vmss"  "scale set"="my-vmss"
--- PASS: TestReconcileVMSS (0.00s)
    --- PASS: TestReconcileVMSS/Memory_is_less_than_2Gi (0.00s)
    --- PASS: TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails (0.00s)
    --- PASS: TestReconcileVMSS/less_than_2_vCPUs (0.00s)
    --- PASS: TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled (0.00s)
    --- PASS: TestReconcileVMSS/failed_to_get_SKU (0.00s)
    --- PASS: TestReconcileVMSS/fails_with_internal_error (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price (0.00s)
    --- PASS: TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_encryption (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm (0.00s)
    --- PASS: TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done (0.00s)
    --- PASS: TestReconcileVMSS/Windows_VMSS_should_not_get_patched (0.00s)
    --- PASS: TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation (0.00s)
=== RUN   TestDeleteVMSS
=== RUN   TestDeleteVMSS/successfully_delete_an_existing_vmss
=== PAUSE TestDeleteVMSS/successfully_delete_an_existing_vmss
=== RUN   TestDeleteVMSS/vmss_already_deleted
=== PAUSE TestDeleteVMSS/vmss_already_deleted
=== RUN   TestDeleteVMSS/vmss_deletion_fails
=== PAUSE TestDeleteVMSS/vmss_deletion_fails
=== CONT  TestDeleteVMSS/successfully_delete_an_existing_vmss
=== CONT  TestDeleteVMSS/vmss_deletion_fails
=== CONT  TestDeleteVMSS/vmss_already_deleted
I0920 16:06:23.536750   72968 scalesets.go:187]  "msg"="deleting VMSS"  "scale set"="my-vmss"
I0920 16:06:23.536758   72968 scalesets.go:187]  "msg"="deleting VMSS"  "scale set"="my-vmss"
--- PASS: TestDeleteVMSS (0.00s)
    --- PASS: TestDeleteVMSS/successfully_delete_an_existing_vmss (0.00s)
    --- PASS: TestDeleteVMSS/vmss_already_deleted (0.00s)
    --- PASS: TestDeleteVMSS/vmss_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets	3.631s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets/mock_scalesets	[no test files]
=== RUN   TestNewService
--- PASS: TestNewService (0.00s)
=== RUN   TestService_Reconcile
=== RUN   TestService_Reconcile/should_reconcile_successfully
=== RUN   TestService_Reconcile/if_404,_then_should_respond_with_transient_error
=== RUN   TestService_Reconcile/if_other_error,_then_should_respond_with_error
--- PASS: TestService_Reconcile (0.00s)
    --- PASS: TestService_Reconcile/should_reconcile_successfully (0.00s)
    --- PASS: TestService_Reconcile/if_404,_then_should_respond_with_transient_error (0.00s)
    --- PASS: TestService_Reconcile/if_other_error,_then_should_respond_with_error (0.00s)
=== RUN   TestService_Delete
=== RUN   TestService_Delete/should_start_deleting_successfully_if_no_long_running_operation_is_active
=== RUN   TestService_Delete/should_finish_deleting_successfully_when_there's_a_long_running_operation_that_has_completed
=== RUN   TestService_Delete/should_not_error_when_deleting,_but_resource_is_404
=== RUN   TestService_Delete/should_error_when_deleting,_but_a_non-404_error_is_returned_from_DELETE_call
=== RUN   TestService_Delete/should_return_error_when_a_long_running_operation_is_active_and_getting_the_result_returns_an_error
--- PASS: TestService_Delete (0.00s)
    --- PASS: TestService_Delete/should_start_deleting_successfully_if_no_long_running_operation_is_active (0.00s)
    --- PASS: TestService_Delete/should_finish_deleting_successfully_when_there's_a_long_running_operation_that_has_completed (0.00s)
    --- PASS: TestService_Delete/should_not_error_when_deleting,_but_resource_is_404 (0.00s)
    --- PASS: TestService_Delete/should_error_when_deleting,_but_a_non-404_error_is_returned_from_DELETE_call (0.00s)
    --- PASS: TestService_Delete/should_return_error_when_a_long_running_operation_is_active_and_getting_the_result_returns_an_error (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms	3.421s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms/mock_scalesetvms	[no test files]
=== RUN   TestReconcileSecurityGroups
=== RUN   TestReconcileSecurityGroups/security_groups_do_not_exist
=== PAUSE TestReconcileSecurityGroups/security_groups_do_not_exist
=== RUN   TestReconcileSecurityGroups/security_group_exists
=== PAUSE TestReconcileSecurityGroups/security_group_exists
=== RUN   TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode
=== PAUSE TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode
=== CONT  TestReconcileSecurityGroups/security_groups_do_not_exist
=== CONT  TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode
=== CONT  TestReconcileSecurityGroups/security_group_exists
I0920 16:06:24.403021   72974 securitygroups.go:61]  "msg"="Skipping network security group reconcile in custom VNet mode"
I0920 16:06:24.403021   72974 securitygroups.go:93]  "msg"="creating security group"  "security group"="nsg-one"
I0920 16:06:24.403141   72974 securitygroups.go:110]  "msg"="successfully created or updated security group"  "security group"="nsg-one"
I0920 16:06:24.403267   72974 securitygroups.go:89]  "msg"="security group exists and no default rules are missing, skipping update"  "security group"="nsg-two"
I0920 16:06:24.403324   72974 securitygroups.go:110]  "msg"="successfully created or updated security group"  "security group"="nsg-one"
I0920 16:06:24.403340   72974 securitygroups.go:93]  "msg"="creating security group"  "security group"="nsg-two"
I0920 16:06:24.403373   72974 securitygroups.go:110]  "msg"="successfully created or updated security group"  "security group"="nsg-two"
--- PASS: TestReconcileSecurityGroups (0.00s)
    --- PASS: TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode (0.00s)
    --- PASS: TestReconcileSecurityGroups/security_group_exists (0.00s)
    --- PASS: TestReconcileSecurityGroups/security_groups_do_not_exist (0.00s)
=== RUN   TestDeleteSecurityGroups
=== RUN   TestDeleteSecurityGroups/security_groups_exist
=== PAUSE TestDeleteSecurityGroups/security_groups_exist
=== RUN   TestDeleteSecurityGroups/security_group_already_deleted
=== PAUSE TestDeleteSecurityGroups/security_group_already_deleted
=== RUN   TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode
=== PAUSE TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode
=== CONT  TestDeleteSecurityGroups/security_groups_exist
=== CONT  TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode
=== CONT  TestDeleteSecurityGroups/security_group_already_deleted
I0920 16:06:24.403537   72974 securitygroups.go:144]  "msg"="Skipping network security group delete in custom VNet mode"
I0920 16:06:24.403550   72974 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-one"
I0920 16:06:24.403567   72974 securitygroups.go:159]  "msg"="successfully deleted security group"  "security group"="nsg-one"
I0920 16:06:24.403568   72974 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-one"
I0920 16:06:24.403576   72974 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-two"
I0920 16:06:24.403585   72974 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-two"
I0920 16:06:24.403588   72974 securitygroups.go:159]  "msg"="successfully deleted security group"  "security group"="nsg-two"
I0920 16:06:24.403596   72974 securitygroups.go:159]  "msg"="successfully deleted security group"  "security group"="nsg-two"
--- PASS: TestDeleteSecurityGroups (0.00s)
    --- PASS: TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode (0.00s)
    --- PASS: TestDeleteSecurityGroups/security_groups_exist (0.00s)
    --- PASS: TestDeleteSecurityGroups/security_group_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups	3.553s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups/mock_securitygroups	[no test files]
=== RUN   TestReconcileSubnets
=== RUN   TestReconcileSubnets/subnet_does_not_exist
=== PAUSE TestReconcileSubnets/subnet_does_not_exist
=== RUN   TestReconcileSubnets/subnet_ipv6_does_not_exist
=== PAUSE TestReconcileSubnets/subnet_ipv6_does_not_exist
=== RUN   TestReconcileSubnets/fail_to_create_subnet
=== PAUSE TestReconcileSubnets/fail_to_create_subnet
=== RUN   TestReconcileSubnets/fail_to_get_existing_subnet
=== PAUSE TestReconcileSubnets/fail_to_get_existing_subnet
=== RUN   TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing
=== PAUSE TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing
=== RUN   TestReconcileSubnets/vnet_was_provided_and_subnet_exists
=== PAUSE TestReconcileSubnets/vnet_was_provided_and_subnet_exists
=== RUN   TestReconcileSubnets/vnet_for_ipv6_is_provided
=== PAUSE TestReconcileSubnets/vnet_for_ipv6_is_provided
=== RUN   TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway
=== PAUSE TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway
=== RUN   TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values
=== PAUSE TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values
=== CONT  TestReconcileSubnets/subnet_does_not_exist
=== CONT  TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway
=== CONT  TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing
=== CONT  TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values
=== CONT  TestReconcileSubnets/vnet_for_ipv6_is_provided
=== CONT  TestReconcileSubnets/fail_to_create_subnet
=== CONT  TestReconcileSubnets/fail_to_get_existing_subnet
=== CONT  TestReconcileSubnets/vnet_was_provided_and_subnet_exists
=== CONT  TestReconcileSubnets/subnet_ipv6_does_not_exist
I0920 16:06:24.819610   72978 subnets.go:103]  "msg"="creating subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.819808   72978 subnets.go:103]  "msg"="creating subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.819726   72978 subnets.go:103]  "msg"="creating subnet in vnet"  "subnet"="my-ipv6-subnet" "vnet"="my-vnet"
I0920 16:06:24.819897   72978 subnets.go:117]  "msg"="successfully created subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.819930   72978 subnets.go:117]  "msg"="successfully created subnet in vnet"  "subnet"="my-ipv6-subnet" "vnet"="my-vnet"
--- PASS: TestReconcileSubnets (0.00s)
    --- PASS: TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway (0.00s)
    --- PASS: TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing (0.00s)
    --- PASS: TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values (0.00s)
    --- PASS: TestReconcileSubnets/vnet_for_ipv6_is_provided (0.00s)
    --- PASS: TestReconcileSubnets/fail_to_get_existing_subnet (0.00s)
    --- PASS: TestReconcileSubnets/fail_to_create_subnet (0.00s)
    --- PASS: TestReconcileSubnets/vnet_was_provided_and_subnet_exists (0.00s)
    --- PASS: TestReconcileSubnets/subnet_does_not_exist (0.00s)
    --- PASS: TestReconcileSubnets/subnet_ipv6_does_not_exist (0.00s)
=== RUN   TestDeleteSubnets
=== RUN   TestDeleteSubnets/subnet_deleted_successfully
=== PAUSE TestDeleteSubnets/subnet_deleted_successfully
=== RUN   TestDeleteSubnets/subnet_already_deleted
=== PAUSE TestDeleteSubnets/subnet_already_deleted
=== RUN   TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully
=== PAUSE TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully
=== RUN   TestDeleteSubnets/skip_delete_if_vnet_is_managed
=== PAUSE TestDeleteSubnets/skip_delete_if_vnet_is_managed
=== RUN   TestDeleteSubnets/fail_delete_subnet
=== PAUSE TestDeleteSubnets/fail_delete_subnet
=== CONT  TestDeleteSubnets/subnet_deleted_successfully
=== CONT  TestDeleteSubnets/skip_delete_if_vnet_is_managed
=== CONT  TestDeleteSubnets/fail_delete_subnet
=== CONT  TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully
=== CONT  TestDeleteSubnets/subnet_already_deleted
I0920 16:06:24.820159   72978 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.820174   72978 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.820210   72978 subnets.go:143]  "msg"="successfully deleted subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.820230   72978 subnets.go:130]  "msg"="Skipping subnets deletion in custom vnet mode"
I0920 16:06:24.820232   72978 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
I0920 16:06:24.820238   72978 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.820233   72978 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0920 16:06:24.820271   72978 subnets.go:143]  "msg"="successfully deleted subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
I0920 16:06:24.820288   72978 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
I0920 16:06:24.820313   72978 subnets.go:143]  "msg"="successfully deleted subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
--- PASS: TestDeleteSubnets (0.00s)
    --- PASS: TestDeleteSubnets/fail_delete_subnet (0.00s)
    --- PASS: TestDeleteSubnets/skip_delete_if_vnet_is_managed (0.00s)
    --- PASS: TestDeleteSubnets/subnet_already_deleted (0.00s)
    --- PASS: TestDeleteSubnets/subnet_deleted_successfully (0.00s)
    --- PASS: TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets	3.475s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets/mock_subnets	[no test files]
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags
=== PAUSE TestReconcileTags/create_tags
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags
=== CONT  TestReconcileTags/error_updating_tags
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/tags_unchanged
I0920 16:06:12.331526   72764 tags.go:66]  "msg"="Updating tags"
I0920 16:06:12.331526   72764 tags.go:66]  "msg"="Updating tags"
I0920 16:06:12.331526   72764 tags.go:66]  "msg"="Updating tags"
I0920 16:06:12.331823   72764 tags.go:91]  "msg"="successfully updated tags"
I0920 16:06:12.331845   72764 tags.go:66]  "msg"="Updating tags"
I0920 16:06:12.331877   72764 tags.go:91]  "msg"="successfully updated tags"
--- PASS: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/create_tags (0.00s)
=== RUN   TestTagsChanged
=== RUN   TestTagsChanged/tag_deleted
=== RUN   TestTagsChanged/tag_created
=== RUN   TestTagsChanged/tag_deleted_and_another_created
=== RUN   TestTagsChanged/tags_are_the_same
=== RUN   TestTagsChanged/tag_value_changed
--- PASS: TestTagsChanged (0.00s)
    --- PASS: TestTagsChanged/tag_deleted (0.00s)
    --- PASS: TestTagsChanged/tag_created (0.00s)
    --- PASS: TestTagsChanged/tag_deleted_and_another_created (0.00s)
    --- PASS: TestTagsChanged/tags_are_the_same (0.00s)
    --- PASS: TestTagsChanged/tag_value_changed (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	3.389s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags/mock_tags	[no test files]
=== RUN   TestGetExistingVM
=== RUN   TestGetExistingVM/get_existing_vm
=== PAUSE TestGetExistingVM/get_existing_vm
=== RUN   TestGetExistingVM/vm_not_found
=== PAUSE TestGetExistingVM/vm_not_found
=== RUN   TestGetExistingVM/vm_retrieval_fails
=== PAUSE TestGetExistingVM/vm_retrieval_fails
=== RUN   TestGetExistingVM/get_existing_vm:_error_getting_public_IP
=== PAUSE TestGetExistingVM/get_existing_vm:_error_getting_public_IP
=== RUN   TestGetExistingVM/get_existing_vm:_public_IP_not_found
=== PAUSE TestGetExistingVM/get_existing_vm:_public_IP_not_found
=== CONT  TestGetExistingVM/get_existing_vm
=== CONT  TestGetExistingVM/get_existing_vm:_error_getting_public_IP
=== CONT  TestGetExistingVM/vm_retrieval_fails
=== CONT  TestGetExistingVM/vm_not_found
=== CONT  TestGetExistingVM/get_existing_vm:_public_IP_not_found
--- PASS: TestGetExistingVM (0.00s)
    --- PASS: TestGetExistingVM/vm_retrieval_fails (0.00s)
    --- PASS: TestGetExistingVM/get_existing_vm:_error_getting_public_IP (0.00s)
    --- PASS: TestGetExistingVM/vm_not_found (0.00s)
    --- PASS: TestGetExistingVM/get_existing_vm (0.00s)
    --- PASS: TestGetExistingVM/get_existing_vm:_public_IP_not_found (0.00s)
=== RUN   TestReconcileVM
=== RUN   TestReconcileVM/can_create_a_vm
=== PAUSE TestReconcileVM/can_create_a_vm
=== RUN   TestReconcileVM/can_create_a_vm_with_system_assigned_identity
=== PAUSE TestReconcileVM/can_create_a_vm_with_system_assigned_identity
=== RUN   TestReconcileVM/can_create_a_vm_with_user_assigned_identity
=== PAUSE TestReconcileVM/can_create_a_vm_with_user_assigned_identity
=== RUN   TestReconcileVM/can_create_a_spot_vm
=== PAUSE TestReconcileVM/can_create_a_spot_vm
=== RUN   TestReconcileVM/can_create_a_windows_vm
=== PAUSE TestReconcileVM/can_create_a_windows_vm
=== RUN   TestReconcileVM/can_create_a_vm_with_encryption
=== PAUSE TestReconcileVM/can_create_a_vm_with_encryption
=== RUN   TestReconcileVM/can_create_a_vm_with_encryption_at_host
=== PAUSE TestReconcileVM/can_create_a_vm_with_encryption_at_host
=== RUN   TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set
=== PAUSE TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set
=== RUN   TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== PAUSE TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== RUN   TestReconcileVM/vm_creation_fails
=== PAUSE TestReconcileVM/vm_creation_fails
=== RUN   TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2
=== PAUSE TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2
=== RUN   TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi
=== PAUSE TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi
=== RUN   TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os
=== PAUSE TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os
=== RUN   TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk
=== PAUSE TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk
=== RUN   TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan
=== PAUSE TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan
=== RUN   TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_
=== PAUSE TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_
=== RUN   TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan
=== PAUSE TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan
=== RUN   TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled
=== PAUSE TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled
=== RUN   TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled
=== PAUSE TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVM/can_create_a_vm
=== CONT  TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2
=== CONT  TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_
=== CONT  TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk
=== CONT  TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan
=== CONT  TestReconcileVM/can_create_a_vm_with_encryption_at_host
=== CONT  TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan
=== CONT  TestReconcileVM/can_create_a_vm_with_user_assigned_identity
=== CONT  TestReconcileVM/can_create_a_vm_with_encryption
=== CONT  TestReconcileVM/vm_creation_fails
=== CONT  TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== CONT  TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set
=== CONT  TestReconcileVM/can_create_a_spot_vm
I0920 16:06:25.240279   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-ultra-ssd-vm"
I0920 16:06:25.240947   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.240984   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
=== CONT  TestReconcileVM/can_create_a_windows_vm
I0920 16:06:25.241051   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
=== CONT  TestReconcileVM/can_create_a_vm_with_system_assigned_identity
I0920 16:06:25.240280   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.241092   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
=== CONT  TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os
I0920 16:06:25.241257   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.241267   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.241303   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
=== CONT  TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi
I0920 16:06:25.241314   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.240284   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.241428   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.240285   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-ultra-ssd-vm"
I0920 16:06:25.240359   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.241514   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.240782   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.240794   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.241661   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.240813   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.240814   72979 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0920 16:06:25.242002   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.241919   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.241941   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.242042   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.242047   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.241944   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.242059   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.242073   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.242175   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0920 16:06:25.242237   72979 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-ultra-ssd-vm"
--- PASS: TestReconcileVM (0.00s)
    --- PASS: TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_ (0.00s)
    --- PASS: TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_encryption (0.00s)
    --- PASS: TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os (0.00s)
    --- PASS: TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2 (0.00s)
    --- PASS: TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi (0.00s)
    --- PASS: TestReconcileVM/can_create_a_spot_vm (0.00s)
    --- PASS: TestReconcileVM/vm_creation_fails (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_user_assigned_identity (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set (0.00s)
    --- PASS: TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_encryption_at_host (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_system_assigned_identity (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm (0.00s)
    --- PASS: TestReconcileVM/can_create_a_windows_vm (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled (0.00s)
=== RUN   TestDeleteVM
=== RUN   TestDeleteVM/successfully_delete_an_existing_vm
=== PAUSE TestDeleteVM/successfully_delete_an_existing_vm
=== RUN   TestDeleteVM/vm_already_deleted
=== PAUSE TestDeleteVM/vm_already_deleted
=== RUN   TestDeleteVM/vm_deletion_fails
=== PAUSE TestDeleteVM/vm_deletion_fails
=== CONT  TestDeleteVM/successfully_delete_an_existing_vm
=== CONT  TestDeleteVM/vm_deletion_fails
=== CONT  TestDeleteVM/vm_already_deleted
I0920 16:06:25.242435   72979 virtualmachines.go:220]  "msg"="deleting VM"  "vm"="my-existing-vm"
I0920 16:06:25.242444   72979 virtualmachines.go:220]  "msg"="deleting VM"  "vm"="my-vm"
I0920 16:06:25.242452   72979 virtualmachines.go:230]  "msg"="successfully deleted VM"  "vm"="my-existing-vm"
I0920 16:06:25.242497   72979 virtualmachines.go:220]  "msg"="deleting VM"  "vm"="my-vm"
--- PASS: TestDeleteVM (0.00s)
    --- PASS: TestDeleteVM/successfully_delete_an_existing_vm (0.00s)
    --- PASS: TestDeleteVM/vm_deletion_fails (0.00s)
    --- PASS: TestDeleteVM/vm_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines	3.640s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines/mock_virtualmachines	[no test files]
=== RUN   TestReconcileVnet
=== RUN   TestReconcileVnet/managed_vnet_exists
=== PAUSE TestReconcileVnet/managed_vnet_exists
=== RUN   TestReconcileVnet/managed_ipv6_vnet_exists
=== PAUSE TestReconcileVnet/managed_ipv6_vnet_exists
=== RUN   TestReconcileVnet/vnet_created_successufuly
=== PAUSE TestReconcileVnet/vnet_created_successufuly
=== RUN   TestReconcileVnet/ipv6_vnet_created_successufuly
=== PAUSE TestReconcileVnet/ipv6_vnet_created_successufuly
=== RUN   TestReconcileVnet/unmanaged_vnet_exists
=== PAUSE TestReconcileVnet/unmanaged_vnet_exists
=== RUN   TestReconcileVnet/custom_vnet_not_found
=== PAUSE TestReconcileVnet/custom_vnet_not_found
=== RUN   TestReconcileVnet/failed_to_fetch_vnet
=== PAUSE TestReconcileVnet/failed_to_fetch_vnet
=== RUN   TestReconcileVnet/fail_to_create_vnet
=== PAUSE TestReconcileVnet/fail_to_create_vnet
=== CONT  TestReconcileVnet/managed_vnet_exists
=== CONT  TestReconcileVnet/failed_to_fetch_vnet
=== CONT  TestReconcileVnet/unmanaged_vnet_exists
=== CONT  TestReconcileVnet/custom_vnet_not_found
=== CONT  TestReconcileVnet/fail_to_create_vnet
=== CONT  TestReconcileVnet/managed_ipv6_vnet_exists
=== CONT  TestReconcileVnet/vnet_created_successufuly
=== CONT  TestReconcileVnet/ipv6_vnet_created_successufuly
I0920 16:06:25.652919   72980 virtualnetworks.go:78]  "msg"="Working on custom VNet"  "vnet-id"="azure/custom-vnet/id"
I0920 16:06:25.652925   72980 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="custom-vnet"
I0920 16:06:25.653134   72980 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="vnet-ipv6-new"
I0920 16:06:25.653150   72980 virtualnetworks.go:104]  "msg"="successfully created VNet"  "VNet"="custom-vnet"
I0920 16:06:25.652985   72980 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="custom-vnet"
I0920 16:06:25.653066   72980 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="vnet-new"
I0920 16:06:25.653201   72980 virtualnetworks.go:104]  "msg"="successfully created VNet"  "VNet"="vnet-new"
I0920 16:06:25.653248   72980 virtualnetworks.go:104]  "msg"="successfully created VNet"  "VNet"="vnet-ipv6-new"
--- PASS: TestReconcileVnet (0.00s)
    --- PASS: TestReconcileVnet/managed_vnet_exists (0.00s)
    --- PASS: TestReconcileVnet/failed_to_fetch_vnet (0.00s)
    --- PASS: TestReconcileVnet/managed_ipv6_vnet_exists (0.00s)
    --- PASS: TestReconcileVnet/unmanaged_vnet_exists (0.00s)
    --- PASS: TestReconcileVnet/custom_vnet_not_found (0.00s)
    --- PASS: TestReconcileVnet/fail_to_create_vnet (0.00s)
    --- PASS: TestReconcileVnet/vnet_created_successufuly (0.00s)
    --- PASS: TestReconcileVnet/ipv6_vnet_created_successufuly (0.00s)
=== RUN   TestDeleteVnet
=== RUN   TestDeleteVnet/managed_vnet_exists
=== PAUSE TestDeleteVnet/managed_vnet_exists
=== RUN   TestDeleteVnet/managed_vnet_already_deleted
=== PAUSE TestDeleteVnet/managed_vnet_already_deleted
=== RUN   TestDeleteVnet/unmanaged_vnet
=== PAUSE TestDeleteVnet/unmanaged_vnet
=== RUN   TestDeleteVnet/fail_to_delete_vnet
=== PAUSE TestDeleteVnet/fail_to_delete_vnet
=== CONT  TestDeleteVnet/managed_vnet_exists
=== CONT  TestDeleteVnet/unmanaged_vnet
=== CONT  TestDeleteVnet/fail_to_delete_vnet
=== CONT  TestDeleteVnet/managed_vnet_already_deleted
I0920 16:06:25.653484   72980 virtualnetworks.go:127]  "msg"="deleting VNet"  "VNet"="vnet-exists"
I0920 16:06:25.653505   72980 virtualnetworks.go:138]  "msg"="successfully deleted VNet"  "VNet"="vnet-exists"
I0920 16:06:25.653520   72980 virtualnetworks.go:123]  "msg"="Skipping VNet deletion in custom vnet mode"
I0920 16:06:25.653565   72980 virtualnetworks.go:127]  "msg"="deleting VNet"  "VNet"="vnet-exists"
--- PASS: TestDeleteVnet (0.00s)
    --- PASS: TestDeleteVnet/managed_vnet_exists (0.00s)
    --- PASS: TestDeleteVnet/managed_vnet_already_deleted (0.00s)
    --- PASS: TestDeleteVnet/unmanaged_vnet (0.00s)
    --- PASS: TestDeleteVnet/fail_to_delete_vnet (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks	3.711s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks/mock_virtualnetworks	[no test files]
=== RUN   TestReconcileVMExtension
=== RUN   TestReconcileVMExtension/extension_is_in_succeeded_state
=== PAUSE TestReconcileVMExtension/extension_is_in_succeeded_state
=== RUN   TestReconcileVMExtension/extension_is_in_failed_state
=== PAUSE TestReconcileVMExtension/extension_is_in_failed_state
=== RUN   TestReconcileVMExtension/extension_is_still_creating
=== PAUSE TestReconcileVMExtension/extension_is_still_creating
=== RUN   TestReconcileVMExtension/reconcile_multiple_extensions
=== PAUSE TestReconcileVMExtension/reconcile_multiple_extensions
=== RUN   TestReconcileVMExtension/error_getting_the_extension
=== PAUSE TestReconcileVMExtension/error_getting_the_extension
=== RUN   TestReconcileVMExtension/error_creating_the_extension
=== PAUSE TestReconcileVMExtension/error_creating_the_extension
=== CONT  TestReconcileVMExtension/extension_is_in_succeeded_state
=== CONT  TestReconcileVMExtension/reconcile_multiple_extensions
=== CONT  TestReconcileVMExtension/extension_is_in_failed_state
=== CONT  TestReconcileVMExtension/error_creating_the_extension
=== CONT  TestReconcileVMExtension/error_getting_the_extension
=== CONT  TestReconcileVMExtension/extension_is_still_creating
I0920 16:06:12.842362   72772 vmextensions.go:69]  "msg"="creating VM extension"  "vm extension"="my-extension-1"
I0920 16:06:12.842396   72772 vmextensions.go:69]  "msg"="creating VM extension"  "vm extension"="my-extension-1"
I0920 16:06:12.842921   72772 vmextensions.go:89]  "msg"="successfully created VM extension"  "vm extension"="my-extension-1"
I0920 16:06:12.842947   72772 vmextensions.go:69]  "msg"="creating VM extension"  "vm extension"="other-extension"
I0920 16:06:12.843003   72772 vmextensions.go:89]  "msg"="successfully created VM extension"  "vm extension"="other-extension"
--- PASS: TestReconcileVMExtension (0.00s)
    --- PASS: TestReconcileVMExtension/extension_is_in_succeeded_state (0.00s)
    --- PASS: TestReconcileVMExtension/extension_is_in_failed_state (0.00s)
    --- PASS: TestReconcileVMExtension/error_getting_the_extension (0.00s)
    --- PASS: TestReconcileVMExtension/extension_is_still_creating (0.00s)
    --- PASS: TestReconcileVMExtension/error_creating_the_extension (0.00s)
    --- PASS: TestReconcileVMExtension/reconcile_multiple_extensions (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions	3.781s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions/mock_vmextensions	[no test files]
=== RUN   TestReconcileVMSSExtension
=== RUN   TestReconcileVMSSExtension/extension_already_exists
=== PAUSE TestReconcileVMSSExtension/extension_already_exists
=== RUN   TestReconcileVMSSExtension/extension_does_not_exist
=== PAUSE TestReconcileVMSSExtension/extension_does_not_exist
=== RUN   TestReconcileVMSSExtension/error_getting_the_extension
=== PAUSE TestReconcileVMSSExtension/error_getting_the_extension
=== CONT  TestReconcileVMSSExtension/extension_already_exists
=== CONT  TestReconcileVMSSExtension/error_getting_the_extension
=== CONT  TestReconcileVMSSExtension/extension_does_not_exist
--- PASS: TestReconcileVMSSExtension (0.00s)
    --- PASS: TestReconcileVMSSExtension/error_getting_the_extension (0.00s)
    --- PASS: TestReconcileVMSSExtension/extension_does_not_exist (0.00s)
    --- PASS: TestReconcileVMSSExtension/extension_already_exists (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions	4.271s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions/mock_vmssextensions	[no test files]
=== RUN   TestAzureClusterReconcilerDelete
=== RUN   TestAzureClusterReconcilerDelete/Resource_Group_delete_fails
=== PAUSE TestAzureClusterReconcilerDelete/Resource_Group_delete_fails
=== RUN   TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster
=== PAUSE TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster
=== RUN   TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails
=== PAUSE TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails
=== RUN   TestAzureClusterReconcilerDelete/Route_table_delete_fails
=== PAUSE TestAzureClusterReconcilerDelete/Route_table_delete_fails
=== RUN   TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully
=== PAUSE TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully
=== CONT  TestAzureClusterReconcilerDelete/Resource_Group_delete_fails
=== CONT  TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully
=== CONT  TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails
=== CONT  TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster
=== CONT  TestAzureClusterReconcilerDelete/Route_table_delete_fails
--- PASS: TestAzureClusterReconcilerDelete (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Resource_Group_delete_fails (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Route_table_delete_fails (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster (0.00s)
=== RUN   TestUnclonedMachinesPredicate
=== RUN   TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true
=== PAUSE TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true
=== RUN   TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true
=== PAUSE TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true
=== RUN   TestUnclonedMachinesPredicate/cloned_node_should_return_false
=== PAUSE TestUnclonedMachinesPredicate/cloned_node_should_return_false
=== CONT  TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true
=== CONT  TestUnclonedMachinesPredicate/cloned_node_should_return_false
=== CONT  TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true
--- PASS: TestUnclonedMachinesPredicate (0.00s)
    --- PASS: TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true (0.00s)
    --- PASS: TestUnclonedMachinesPredicate/cloned_node_should_return_false (0.00s)
    --- PASS: TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true (0.00s)
=== RUN   TestAzureJSONMachineReconciler
=== RUN   TestAzureJSONMachineReconciler/should_reconcile_normally
=== RUN   TestAzureJSONMachineReconciler/missing_azure_cluster_should_return_error
E0920 16:06:26.156302   72981 azurejson_machine_controller.go:160]  "msg"="failed to fetch AzureCluster" "error"="azureclusters.infrastructure.cluster.x-k8s.io \"my-azure-cluster\" not found" "azureMachine"="my-machine" "cluster"="my-cluster" "namespace"=""
--- PASS: TestAzureJSONMachineReconciler (0.01s)
    --- PASS: TestAzureJSONMachineReconciler/should_reconcile_normally (0.00s)
    --- PASS: TestAzureJSONMachineReconciler/missing_azure_cluster_should_return_error (0.00s)
=== RUN   TestAzureJSONPoolReconciler
=== RUN   TestAzureJSONPoolReconciler/should_reconcile_normally
=== RUN   TestAzureJSONPoolReconciler/missing_azure_cluster_should_return_error
E0920 16:06:26.160944   72981 azurejson_machinepool_controller.go:127]  "msg"="failed to fetch AzureCluster" "error"="azureclusters.infrastructure.cluster.x-k8s.io \"my-azure-cluster\" not found" "azureMachinePool"="my-azure-machine-pool" "cluster"="my-cluster" "machinePool"="my-machine-pool" "namespace"=""
--- PASS: TestAzureJSONPoolReconciler (0.00s)
    --- PASS: TestAzureJSONPoolReconciler/should_reconcile_normally (0.00s)
    --- PASS: TestAzureJSONPoolReconciler/missing_azure_cluster_should_return_error (0.00s)
=== RUN   TestAzureJSONTemplateReconciler
=== RUN   TestAzureJSONTemplateReconciler/should_reconcile_normally
=== RUN   TestAzureJSONTemplateReconciler/missing_azure_cluster_should_return_error
E0920 16:06:26.163145   72981 azurejson_machinetemplate_controller.go:123]  "msg"="failed to fetch AzureCluster" "error"="azureclusters.infrastructure.cluster.x-k8s.io \"my-azure-cluster\" not found" "azureMachineTemplate"="my-json-template" "cluster"="my-cluster" "namespace"=""
--- PASS: TestAzureJSONTemplateReconciler (0.00s)
    --- PASS: TestAzureJSONTemplateReconciler/should_reconcile_normally (0.00s)
    --- PASS: TestAzureJSONTemplateReconciler/missing_azure_cluster_should_return_error (0.00s)
=== RUN   TestConditions
=== RUN   TestConditions/cluster_infrastructure_is_not_ready_yet
I0920 16:06:26.164725   72981 azuremachine_controller.go:242]  "msg"="Reconciling AzureMachine"
I0920 16:06:26.165001   72981 azuremachine_controller.go:257]  "msg"="Cluster infrastructure is not ready yet"
=== RUN   TestConditions/bootstrap_data_secret_reference_is_not_yet_available
I0920 16:06:26.165109   72981 azuremachine_controller.go:242]  "msg"="Reconciling AzureMachine"
I0920 16:06:26.165320   72981 azuremachine_controller.go:264]  "msg"="Bootstrap data secret reference is not yet available"
--- PASS: TestConditions (0.00s)
    --- PASS: TestConditions/cluster_infrastructure_is_not_ready_yet (0.00s)
    --- PASS: TestConditions/bootstrap_data_secret_reference_is_not_yet_available (0.00s)
=== RUN   TestAzureClusterToAzureMachinesMapper
--- PASS: TestAzureClusterToAzureMachinesMapper (0.00s)
=== RUN   TestGetCloudProviderConfig
=== RUN   TestGetCloudProviderConfig/user-assigned-identity
=== RUN   TestGetCloudProviderConfig/serviceprincipal_with_custom_vnet
=== RUN   TestGetCloudProviderConfig/with_rate_limits
=== RUN   TestGetCloudProviderConfig/with_back-off_config
=== RUN   TestGetCloudProviderConfig/serviceprincipal
=== RUN   TestGetCloudProviderConfig/system-assigned-identity
--- PASS: TestGetCloudProviderConfig (0.00s)
    --- PASS: TestGetCloudProviderConfig/user-assigned-identity (0.00s)
    --- PASS: TestGetCloudProviderConfig/serviceprincipal_with_custom_vnet (0.00s)
    --- PASS: TestGetCloudProviderConfig/with_rate_limits (0.00s)
    --- PASS: TestGetCloudProviderConfig/with_back-off_config (0.00s)
    --- PASS: TestGetCloudProviderConfig/serviceprincipal (0.00s)
    --- PASS: TestGetCloudProviderConfig/system-assigned-identity (0.00s)
=== RUN   TestReconcileAzureSecret
2021-09-20T16:06:26.169+0530	INFO	azurecluster-resource	default	{"name": "foo"}
=== RUN   TestReconcileAzureSecret/azuremachine_should_reconcile_secret_successfully
=== RUN   TestReconcileAzureSecret/azuremachinepool_should_reconcile_secret_successfully
=== RUN   TestReconcileAzureSecret/azuremachinetemplate_should_reconcile_secret_successfully
--- PASS: TestReconcileAzureSecret (0.00s)
    --- PASS: TestReconcileAzureSecret/azuremachine_should_reconcile_secret_successfully (0.00s)
    --- PASS: TestReconcileAzureSecret/azuremachinepool_should_reconcile_secret_successfully (0.00s)
    --- PASS: TestReconcileAzureSecret/azuremachinetemplate_should_reconcile_secret_successfully (0.00s)
=== RUN   TestAPIs
Running Suite: Controller Suite
===============================
Random Seed: 1632134186
Will run 4 of 4 specs

2021-09-20T16:06:26.172+0530	DEBUG	controller-runtime.test-env	starting control plane
2021-09-20T16:06:26.178+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 0, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-20T16:06:26.182+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 1, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-20T16:06:26.186+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 2, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-20T16:06:26.190+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 3, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-20T16:06:26.194+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 4, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
STEP: bootstrapping test environment
Panic [0.022 seconds]
[BeforeSuite] BeforeSuite
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:49

  Test Panicked
  unable to start control plane itself: failed to start the controlplane. retried 5 times: fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105

  Full Stack Trace
  sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment()
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105 +0x2d1
  sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4(0x0)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51 +0x4e
  reflect.Value.call({0x2553ac0, 0x2923ba0, 0x13}, {0x28375b7, 0x4}, {0xc000097f70, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543 +0x814
  reflect.Value.Call({0x2553ac0, 0x2923ba0, 0x0}, {0xc00038e770, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339 +0xc5
  github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1(0x0)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49 +0x14f
  github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1()
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86 +0x7a
  created by github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:71 +0xd2
------------------------------


Ran 4 of 0 Specs in 0.022 seconds
FAIL! -- 0 Passed | 4 Failed | 0 Pending | 0 Skipped
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.

  If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters
  You are passing a Done channel to a test node to test asynchronous behavior.  This is deprecated in Ginkgo V2.  Your test will run synchronously and the timeout will be ignored.
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-async-testing
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:49

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

--- FAIL: TestAPIs (0.02s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/controllers	3.244s
?   	sigs.k8s.io/cluster-api-provider-azure/exp	[no test files]
=== RUN   TestFuzzyConversion
=== RUN   TestFuzzyConversion/for_AzureMachinePool
=== RUN   TestFuzzyConversion/for_AzureMachinePool/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureMachinePool/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureManagedCluster
=== RUN   TestFuzzyConversion/for_AzureManagedCluster/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureManagedCluster/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureManagedControlPlane
=== RUN   TestFuzzyConversion/for_AzureManagedControlPlane/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureManagedControlPlane/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureManagedMachinePool
=== RUN   TestFuzzyConversion/for_AzureManagedMachinePool/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureManagedMachinePool/hub-spoke-hub
--- PASS: TestFuzzyConversion (19.32s)
    --- PASS: TestFuzzyConversion/for_AzureMachinePool (8.69s)
        --- PASS: TestFuzzyConversion/for_AzureMachinePool/spoke-hub-spoke (4.63s)
        --- PASS: TestFuzzyConversion/for_AzureMachinePool/hub-spoke-hub (4.06s)
    --- PASS: TestFuzzyConversion/for_AzureManagedCluster (2.78s)
        --- PASS: TestFuzzyConversion/for_AzureManagedCluster/spoke-hub-spoke (1.38s)
        --- PASS: TestFuzzyConversion/for_AzureManagedCluster/hub-spoke-hub (1.40s)
    --- PASS: TestFuzzyConversion/for_AzureManagedControlPlane (4.70s)
        --- PASS: TestFuzzyConversion/for_AzureManagedControlPlane/spoke-hub-spoke (2.07s)
        --- PASS: TestFuzzyConversion/for_AzureManagedControlPlane/hub-spoke-hub (2.63s)
    --- PASS: TestFuzzyConversion/for_AzureManagedMachinePool (3.16s)
        --- PASS: TestFuzzyConversion/for_AzureManagedMachinePool/spoke-hub-spoke (1.52s)
        --- PASS: TestFuzzyConversion/for_AzureManagedMachinePool/hub-spoke-hub (1.64s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha3	23.970s
=== RUN   TestAzureMachinePool_SetDefaultSSHPublicKey
--- PASS: TestAzureMachinePool_SetDefaultSSHPublicKey (0.16s)
=== RUN   TestAzureMachinePool_SetIdentityDefaults
--- PASS: TestAzureMachinePool_SetIdentityDefaults (0.00s)
=== RUN   TestAzureMachinePool_ValidateCreate
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_full
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_publisher
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_shared_gallery_image_-_full
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_subscription
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_with_id
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_without_id
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_wrong_terminate_notification
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity,_but_invalid_role
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity,_but_without_any_provider_ids
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
--- PASS: TestAzureMachinePool_ValidateCreate (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_full (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_publisher (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_shared_gallery_image_-_full (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_subscription (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_with_id (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_without_id (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_wrong_terminate_notification (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity,_but_invalid_role (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity,_but_without_any_provider_ids (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
=== RUN   TestAzureMachinePool_ValidateUpdate
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_unchanged
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_changed
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
--- PASS: TestAzureMachinePool_ValidateUpdate (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_unchanged (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_changed (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
=== RUN   TestAzureMachinePool_Default
--- PASS: TestAzureMachinePool_Default (0.97s)
=== RUN   TestAzureManagedControlPlane_SetDefaultSSHPublicKey
--- PASS: TestAzureManagedControlPlane_SetDefaultSSHPublicKey (0.11s)
=== RUN   TestDefaultingWebhook
    azuremanagedcontrolplane_webhook_test.go:32: Testing amcp defaulting webhook with no baseline
    azuremanagedcontrolplane_webhook_test.go:53: Testing amcp defaulting webhook with baseline
--- PASS: TestDefaultingWebhook (0.91s)
=== RUN   TestValidatingWebhook
=== RUN   TestValidatingWebhook/Testing_valid_DNSServiceIP
=== PAUSE TestValidatingWebhook/Testing_valid_DNSServiceIP
=== RUN   TestValidatingWebhook/Testing_invalid_DNSServiceIP
=== PAUSE TestValidatingWebhook/Testing_invalid_DNSServiceIP
=== RUN   TestValidatingWebhook/Invalid_Version
=== PAUSE TestValidatingWebhook/Invalid_Version
=== RUN   TestValidatingWebhook/not_following_the_kuberntes_Version_pattern
=== PAUSE TestValidatingWebhook/not_following_the_kuberntes_Version_pattern
=== RUN   TestValidatingWebhook/Version_not_set
=== PAUSE TestValidatingWebhook/Version_not_set
=== RUN   TestValidatingWebhook/Valid_Version
=== PAUSE TestValidatingWebhook/Valid_Version
=== RUN   TestValidatingWebhook/Valid_Managed_AADProfile
=== PAUSE TestValidatingWebhook/Valid_Managed_AADProfile
=== CONT  TestValidatingWebhook/Testing_valid_DNSServiceIP
=== CONT  TestValidatingWebhook/Version_not_set
=== CONT  TestValidatingWebhook/Testing_invalid_DNSServiceIP
=== CONT  TestValidatingWebhook/Valid_Managed_AADProfile
=== CONT  TestValidatingWebhook/not_following_the_kuberntes_Version_pattern
=== CONT  TestValidatingWebhook/Valid_Version
=== CONT  TestValidatingWebhook/Invalid_Version
--- PASS: TestValidatingWebhook (0.00s)
    --- PASS: TestValidatingWebhook/Testing_valid_DNSServiceIP (0.00s)
    --- PASS: TestValidatingWebhook/Testing_invalid_DNSServiceIP (0.00s)
    --- PASS: TestValidatingWebhook/Version_not_set (0.00s)
    --- PASS: TestValidatingWebhook/not_following_the_kuberntes_Version_pattern (0.00s)
    --- PASS: TestValidatingWebhook/Invalid_Version (0.00s)
    --- PASS: TestValidatingWebhook/Valid_Version (0.00s)
    --- PASS: TestValidatingWebhook/Valid_Managed_AADProfile (0.00s)
=== RUN   TestAzureManagedControlPlane_ValidateCreate
=== RUN   TestAzureManagedControlPlane_ValidateCreate/all_valid
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_DNSServiceIP
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey_with_a_simple_text_and_invalid_DNSServiceIP
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_version
--- PASS: TestAzureManagedControlPlane_ValidateCreate (0.79s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/all_valid (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_DNSServiceIP (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey_with_a_simple_text_and_invalid_DNSServiceIP (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_version (0.00s)
=== RUN   TestAzureManagedControlPlane_ValidateUpdate
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_valid_SSHPublicKey
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_SSHPublicKey
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_serviceIP
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_version
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SubscriptionID_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ResourceGroupName_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NodeResourceGroupName_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_Location_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SSHPublicKey_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_can_be_set_after_cluster_creation
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_managed_field_cannot_set_to_false
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_adminGroupObjectIDs_cannot_set_to_empty
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled#01
--- PASS: TestAzureManagedControlPlane_ValidateUpdate (1.19s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_serviceIP (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_version (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SubscriptionID_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ResourceGroupName_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NodeResourceGroupName_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_Location_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SSHPublicKey_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_can_be_set_after_cluster_creation (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_managed_field_cannot_set_to_false (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_adminGroupObjectIDs_cannot_set_to_empty (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled#01 (0.00s)
=== RUN   TestAzureManagedMachinePoolDefaultingWebhook
    azuremanagedmachinepool_webhook_test.go:31: Testing ammp defaulting webhook with mode system
--- PASS: TestAzureManagedMachinePoolDefaultingWebhook (0.00s)
=== RUN   TestAzureManagedMachinePoolUpdatingWebhook
    azuremanagedmachinepool_webhook_test.go:53: Testing ammp updating webhook with mode system
=== RUN   TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_SKU_of_the_agentpool
=== RUN   TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_OSDiskSizeGB_of_the_agentpool
--- PASS: TestAzureManagedMachinePoolUpdatingWebhook (0.00s)
    --- PASS: TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_SKU_of_the_agentpool (0.00s)
    --- PASS: TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_OSDiskSizeGB_of_the_agentpool (0.00s)
=== RUN   TestAzureMachinePool_Validate
=== RUN   TestAzureMachinePool_Validate/HasNoImage
=== PAUSE TestAzureMachinePool_Validate/HasNoImage
=== RUN   TestAzureMachinePool_Validate/HasValidImage
=== PAUSE TestAzureMachinePool_Validate/HasValidImage
=== RUN   TestAzureMachinePool_Validate/HasInvalidImage
=== PAUSE TestAzureMachinePool_Validate/HasInvalidImage
=== RUN   TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout
=== PAUSE TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout
=== RUN   TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout
=== PAUSE TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout
=== RUN   TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout
=== PAUSE TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout
=== CONT  TestAzureMachinePool_Validate/HasNoImage
=== CONT  TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout
=== CONT  TestAzureMachinePool_Validate/HasValidImage
=== CONT  TestAzureMachinePool_Validate/HasInvalidImage
=== CONT  TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout
=== CONT  TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout
--- PASS: TestAzureMachinePool_Validate (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasNoImage (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasValidImage (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasInvalidImage (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha4	9.718s
=== RUN   Test_newAzureMachinePoolService
--- PASS: Test_newAzureMachinePoolService (0.00s)
=== RUN   TestAzureMachinePoolMachineReconciler_Reconcile
=== RUN   TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_reconcile
I0920 16:06:26.673039   72982 azuremachinepoolmachine_controller.go:254]  "msg"="Reconciling AzureMachinePoolMachine" "AzureCluster"="azCluster1" "azureMachinePool"="amp1" "azureMachinePoolMachine"="ampm1" "cluster"="cluster1" "machinePool"="mp1" "namespace"="default"
=== RUN   TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_delete
I0920 16:06:26.674580   72982 azuremachinepoolmachine_controller.go:311]  "msg"="Handling deleted AzureMachinePoolMachine" "AzureCluster"="azCluster1" "azureMachinePool"="amp1" "azureMachinePoolMachine"="ampm1" "cluster"="cluster1" "machinePool"="mp1" "namespace"="default"
--- PASS: TestAzureMachinePoolMachineReconciler_Reconcile (0.01s)
    --- PASS: TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_reconcile (0.01s)
    --- PASS: TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_delete (0.00s)
=== RUN   TestIsAgentPoolVMSSNotFoundError
=== RUN   TestIsAgentPoolVMSSNotFoundError/WithANotFoundError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/WithANotFoundError
=== RUN   TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError
=== RUN   TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError
=== RUN   TestIsAgentPoolVMSSNotFoundError/NilError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/NilError
=== CONT  TestIsAgentPoolVMSSNotFoundError/WithANotFoundError
=== CONT  TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError
=== CONT  TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError
=== CONT  TestIsAgentPoolVMSSNotFoundError/NilError
--- PASS: TestIsAgentPoolVMSSNotFoundError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/WithANotFoundError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/NilError (0.00s)
=== RUN   TestAzureClusterToAzureMachinePoolsMapper
--- PASS: TestAzureClusterToAzureMachinePoolsMapper (0.00s)
=== RUN   TestAzureManagedClusterToAzureManagedMachinePoolsMapper
--- PASS: TestAzureManagedClusterToAzureManagedMachinePoolsMapper (0.00s)
=== RUN   TestAzureManagedControlPlaneToAzureManagedMachinePoolsMapper
--- PASS: TestAzureManagedControlPlaneToAzureManagedMachinePoolsMapper (0.00s)
=== RUN   TestMachinePoolToAzureManagedControlPlaneMapFuncSuccess
--- PASS: TestMachinePoolToAzureManagedControlPlaneMapFuncSuccess (0.00s)
=== RUN   TestMachinePoolToAzureManagedControlPlaneMapFuncFailure
--- PASS: TestMachinePoolToAzureManagedControlPlaneMapFuncFailure (0.00s)
=== RUN   TestAzureManagedClusterToAzureManagedControlPlaneMapper
--- PASS: TestAzureManagedClusterToAzureManagedControlPlaneMapper (0.00s)
=== RUN   TestAzureManagedControlPlaneToAzureManagedClusterMapper
--- PASS: TestAzureManagedControlPlaneToAzureManagedClusterMapper (0.00s)
=== RUN   Test_MachinePoolToInfrastructureMapFunc
=== RUN   Test_MachinePoolToInfrastructureMapFunc/MachinePoolToAzureMachinePool
=== RUN   Test_MachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef
=== RUN   Test_MachinePoolToInfrastructureMapFunc/NotAMachinePool
--- PASS: Test_MachinePoolToInfrastructureMapFunc (0.00s)
    --- PASS: Test_MachinePoolToInfrastructureMapFunc/MachinePoolToAzureMachinePool (0.00s)
    --- PASS: Test_MachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef (0.00s)
    --- PASS: Test_MachinePoolToInfrastructureMapFunc/NotAMachinePool (0.00s)
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolToAzureManagedMachinePool
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc/NotAMachinePool
--- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc (0.00s)
    --- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolToAzureManagedMachinePool (0.00s)
    --- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef (0.00s)
    --- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc/NotAMachinePool (0.00s)
=== RUN   Test_azureClusterToAzureMachinePoolsFunc
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist
--- PASS: Test_azureClusterToAzureMachinePoolsFunc (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs (0.00s)
=== RUN   TestAPIs
Running Suite: Controller Suite
===============================
Random Seed: 1632134186
Will run 2 of 2 specs

STEP: bootstrapping test environment
Panic [0.019 seconds]
[BeforeSuite] BeforeSuite
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:50

  Test Panicked
  unable to start control plane itself: failed to start the controlplane. retried 5 times: fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105

  Full Stack Trace
  sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment()
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105 +0x2d1
  sigs.k8s.io/cluster-api-provider-azure/exp/controllers.glob..func3(0x0)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:52 +0x4e
  reflect.Value.call({0x259f740, 0x29c8690, 0x13}, {0x28e0ad6, 0x4}, {0xc000093f70, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:543 +0x814
  reflect.Value.Call({0x259f740, 0x29c8690, 0x0}, {0xc0003a6f70, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17/libexec/src/reflect/value.go:339 +0xc5
  github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1(0x0)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49 +0x14f
  github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1()
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86 +0x7a
  created by github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:71 +0xd2
------------------------------


Ran 2 of 0 Specs in 0.019 seconds
FAIL! -- 0 Passed | 2 Failed | 0 Pending | 0 Skipped
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.

  If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters
  You are passing a Done channel to a test node to test asynchronous behavior.  This is deprecated in Ginkgo V2.  Your test will run synchronously and the timeout will be ignored.
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-async-testing
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:50

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

--- FAIL: TestAPIs (0.02s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/exp/controllers	3.428s
?   	sigs.k8s.io/cluster-api-provider-azure/exp/controllers/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/feature	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/hack/boilerplate/test	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test	[no test files]
=== RUN   TestGetFilePathToCAPICRDs
--- PASS: TestGetFilePathToCAPICRDs (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/env	6.314s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/logentries	[no test files]
=== RUN   TestLogContains
=== RUN   TestLogContains/MatchesCompletely
=== PAUSE TestLogContains/MatchesCompletely
=== RUN   TestLogContains/MatchesWithoutSpecifyingLevel
=== PAUSE TestLogContains/MatchesWithoutSpecifyingLevel
=== RUN   TestLogContains/MatchesWithoutSpecifyingLogFunc
=== PAUSE TestLogContains/MatchesWithoutSpecifyingLogFunc
=== RUN   TestLogContains/MatchesWithoutSpecifyingAllValues
=== PAUSE TestLogContains/MatchesWithoutSpecifyingAllValues
=== CONT  TestLogContains/MatchesCompletely
=== CONT  TestLogContains/MatchesWithoutSpecifyingLogFunc
=== CONT  TestLogContains/MatchesWithoutSpecifyingAllValues
=== CONT  TestLogContains/MatchesWithoutSpecifyingLevel
--- PASS: TestLogContains (0.00s)
    --- PASS: TestLogContains/MatchesCompletely (0.00s)
    --- PASS: TestLogContains/MatchesWithoutSpecifyingLogFunc (0.00s)
    --- PASS: TestLogContains/MatchesWithoutSpecifyingAllValues (0.00s)
    --- PASS: TestLogContains/MatchesWithoutSpecifyingLevel (0.00s)
=== RUN   TestLogContainsEntries
--- PASS: TestLogContainsEntries (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomega	0.760s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomock	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/mock_log	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/cloudtest	[no test files]
=== RUN   TestCoalescingReconciler_Reconcile
=== RUN   TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache
=== RUN   TestCoalescingReconciler_Reconcile/should_not_call_upstream_reconciler_if_key_does_exists_in_cache_and_is_not_expired
=== RUN   TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache_and_return_error
--- PASS: TestCoalescingReconciler_Reconcile (0.00s)
    --- PASS: TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache (0.00s)
    --- PASS: TestCoalescingReconciler_Reconcile/should_not_call_upstream_reconciler_if_key_does_exists_in_cache_and_is_not_expired (0.00s)
    --- PASS: TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache_and_return_error (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing	1.682s
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/ot	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/test/e2e	[no test files]
=== RUN   TestNew
--- PASS: TestNew (0.00s)
=== RUN   TestCache_Add
--- PASS: TestCache_Add (0.00s)
=== RUN   TestCache_Get
=== RUN   TestCache_Get/NoItemsInCache
=== RUN   TestCache_Get/ExistingItemNotExpired
=== RUN   TestCache_Get/ExistingItemExpired
=== RUN   TestCache_Get/ExistingItemGetAdvancesLastTouch
=== RUN   TestCache_Get/ExistingItemIsNotTTLItem
--- PASS: TestCache_Get (0.00s)
    --- PASS: TestCache_Get/NoItemsInCache (0.00s)
    --- PASS: TestCache_Get/ExistingItemNotExpired (0.00s)
    --- PASS: TestCache_Get/ExistingItemExpired (0.00s)
    --- PASS: TestCache_Get/ExistingItemGetAdvancesLastTouch (0.00s)
    --- PASS: TestCache_Get/ExistingItemIsNotTTLItem (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru	0.458s
?   	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru/mocks	[no test files]
=== RUN   TestGet
--- PASS: TestGet (0.00s)
=== RUN   TestHas
--- PASS: TestHas (0.00s)
=== RUN   TestSet
=== RUN   TestSet/Set_adds_a_future
=== RUN   TestSet/Set_adds_more_futures
=== RUN   TestSet/Set_does_not_duplicate_existing_future
=== RUN   TestSet/Set_updates_an_existing_future
--- PASS: TestSet (0.00s)
    --- PASS: TestSet/Set_adds_a_future (0.00s)
    --- PASS: TestSet/Set_adds_more_futures (0.00s)
    --- PASS: TestSet/Set_does_not_duplicate_existing_future (0.00s)
    --- PASS: TestSet/Set_updates_an_existing_future (0.00s)
=== RUN   TestDelete
=== RUN   TestDelete/Delete_removes_a_future
=== RUN   TestDelete/Delete_does_nothing_if_the_future_does_not_exist
--- PASS: TestDelete (0.00s)
    --- PASS: TestDelete/Delete_removes_a_future (0.00s)
    --- PASS: TestDelete/Delete_does_nothing_if_the_future_does_not_exist (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/futures	5.779s
?   	sigs.k8s.io/cluster-api-provider-azure/util/generators	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/identity	[no test files]
=== RUN   TestDefaultedTimeout
=== RUN   TestDefaultedTimeout/WithZeroValueDefaults
=== PAUSE TestDefaultedTimeout/WithZeroValueDefaults
=== RUN   TestDefaultedTimeout/WithRealValue
=== PAUSE TestDefaultedTimeout/WithRealValue
=== RUN   TestDefaultedTimeout/WithNegativeValue
=== PAUSE TestDefaultedTimeout/WithNegativeValue
=== CONT  TestDefaultedTimeout/WithZeroValueDefaults
=== CONT  TestDefaultedTimeout/WithNegativeValue
=== CONT  TestDefaultedTimeout/WithRealValue
--- PASS: TestDefaultedTimeout (0.00s)
    --- PASS: TestDefaultedTimeout/WithZeroValueDefaults (0.00s)
    --- PASS: TestDefaultedTimeout/WithNegativeValue (0.00s)
    --- PASS: TestDefaultedTimeout/WithRealValue (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/reconciler	1.071s
?   	sigs.k8s.io/cluster-api-provider-azure/util/slice	[no test files]
=== RUN   TestGenerateSSHKey
--- PASS: TestGenerateSSHKey (0.67s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/ssh	2.599s
=== RUN   TestGetNamespace
=== RUN   TestGetNamespace/env_var_set_to_custom_namespace
=== RUN   TestGetNamespace/env_var_empty
--- PASS: TestGetNamespace (0.00s)
    --- PASS: TestGetNamespace/env_var_set_to_custom_namespace (0.00s)
    --- PASS: TestGetNamespace/env_var_empty (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/system	1.344s
?   	sigs.k8s.io/cluster-api-provider-azure/util/tele	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/webhook	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/version	[no test files]
FAIL
cluster-api-provider-azure $
```

There are some failures. I was also wondering how E2E tests run and if they need Azure account credentials to run with actual Azure resources. I gotta check that out in the development guide

https://capz.sigs.k8s.io/developers/development.html

https://capz.sigs.k8s.io/developers/development.html#submitting-prs-and-testing

lint -

```bash
cluster-api-provider-azure $ make lint
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh github.com/golangci/golangci-lint/cmd/golangci-lint golangci-lint v1.41.1
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/golangci-lint*: No such file or directory
go: creating new go.mod: module fake/mod
go: downloading github.com/golangci/golangci-lint v1.41.1
go: downloading github.com/go-critic/go-critic v0.5.6
go: downloading github.com/golangci/revgrep v0.0.0-20210208091834-cd28932614b5
go: downloading github.com/Djarvur/go-err113 v0.0.0-20210108212216-aea10b59be24
go: downloading github.com/alexkohler/prealloc v1.0.0
go: downloading github.com/ashanbrown/forbidigo v1.2.0
go: downloading github.com/ashanbrown/makezero v0.0.0-20210520155254-b6261585ddde
go: downloading github.com/bkielbasa/cyclop v1.2.0
go: downloading github.com/bombsimon/wsl/v3 v3.3.0
go: downloading github.com/charithe/durationcheck v0.0.8
go: downloading github.com/esimonov/ifshort v1.0.2
go: downloading github.com/fzipp/gocyclo v0.3.1
go: downloading github.com/gordonklaus/ineffassign v0.0.0-20210225214923-2e10b2664254
go: downloading github.com/gostaticanalysis/forcetypeassert v0.0.0-20200621232751-01d4955beaa5
go: downloading github.com/gostaticanalysis/nilerr v0.1.1
go: downloading github.com/jgautheron/goconst v1.5.1
go: downloading github.com/jingyugao/rowserrcheck v1.1.0
go: downloading github.com/julz/importas v0.0.0-20210419104244-841f0c0fe66d
go: downloading github.com/kisielk/errcheck v1.6.0
go: downloading github.com/kulti/thelper v0.4.0
go: downloading github.com/ldez/gomoddirectives v0.2.1
go: downloading github.com/ldez/tagliatelle v0.2.0
go: downloading github.com/matoous/godox v0.0.0-20210227103229-6504466cf951
go: downloading github.com/mbilski/exhaustivestruct v1.2.0
go: downloading github.com/mgechev/dots v0.0.0-20190921121421-c36f7dcfbb81
go: downloading github.com/mgechev/revive v1.0.7
go: downloading github.com/polyfloyd/go-errorlint v0.0.0-20210510181950-ab96adb96fea
go: downloading github.com/ryancurrah/gomodguard v1.2.2
go: downloading github.com/sanposhiho/wastedassign/v2 v2.0.6
go: downloading github.com/securego/gosec/v2 v2.8.0
go: downloading github.com/tetafro/godot v1.4.7
go: downloading github.com/tomarrell/wrapcheck/v2 v2.1.0
go: downloading github.com/tommy-muehle/go-mnd/v2 v2.4.0
go: downloading github.com/yeya24/promlinter v0.1.0
go: downloading mvdan.cc/unparam v0.0.0-20210104141923-aac4ce9116a7
go: downloading github.com/ettle/strcase v0.1.1
go: downloading github.com/quasilyte/go-ruleguard v0.3.4
go: downloading github.com/nbutton23/zxcvbn-go v0.0.0-20210217022336-fa2cb2858354
go: downloading github.com/chavacava/garif v0.0.0-20210405164556-e8a0a408d6af
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added 4d63.com/gochecknoglobals v0.0.0-20201008074935-acfc0b28355a
go get: added github.com/BurntSushi/toml v0.3.1
go get: added github.com/Djarvur/go-err113 v0.0.0-20210108212216-aea10b59be24
go get: added github.com/Masterminds/semver v1.5.0
go get: added github.com/OpenPeeDeeP/depguard v1.0.1
go get: added github.com/alexkohler/prealloc v1.0.0
go get: added github.com/ashanbrown/forbidigo v1.2.0
go get: added github.com/ashanbrown/makezero v0.0.0-20210520155254-b6261585ddde
go get: added github.com/beorn7/perks v1.0.1
go get: added github.com/bkielbasa/cyclop v1.2.0
go get: added github.com/bombsimon/wsl/v3 v3.3.0
go get: added github.com/cespare/xxhash/v2 v2.1.1
go get: added github.com/charithe/durationcheck v0.0.8
go get: added github.com/chavacava/garif v0.0.0-20210405164556-e8a0a408d6af
go get: added github.com/daixiang0/gci v0.2.8
go get: added github.com/davecgh/go-spew v1.1.1
go get: added github.com/denis-tingajkin/go-header v0.4.2
go get: added github.com/esimonov/ifshort v1.0.2
go get: added github.com/ettle/strcase v0.1.1
go get: added github.com/fatih/color v1.12.0
go get: added github.com/fatih/structtag v1.2.0
go get: added github.com/fsnotify/fsnotify v1.4.9
go get: added github.com/fzipp/gocyclo v0.3.1
go get: added github.com/go-critic/go-critic v0.5.6
go get: added github.com/go-toolsmith/astcast v1.0.0
go get: added github.com/go-toolsmith/astcopy v1.0.0
go get: added github.com/go-toolsmith/astequal v1.0.0
go get: added github.com/go-toolsmith/astfmt v1.0.0
go get: added github.com/go-toolsmith/astp v1.0.0
go get: added github.com/go-toolsmith/strparse v1.0.0
go get: added github.com/go-toolsmith/typep v1.0.2
go get: added github.com/go-xmlfmt/xmlfmt v0.0.0-20191208150333-d5b6f63a941b
go get: added github.com/gobwas/glob v0.2.3
go get: added github.com/gofrs/flock v0.8.0
go get: added github.com/golang/protobuf v1.4.3
go get: added github.com/golangci/check v0.0.0-20180506172741-cfe4005ccda2
go get: added github.com/golangci/dupl v0.0.0-20180902072040-3e9179ac440a
go get: added github.com/golangci/go-misc v0.0.0-20180628070357-927a3d87b613
go get: added github.com/golangci/gofmt v0.0.0-20190930125516-244bba706f1a
go get: added github.com/golangci/golangci-lint v1.41.1
go get: added github.com/golangci/lint-1 v0.0.0-20191013205115-297bf364a8e0
go get: added github.com/golangci/maligned v0.0.0-20180506175553-b1d89398deca
go get: added github.com/golangci/misspell v0.3.5
go get: added github.com/golangci/revgrep v0.0.0-20210208091834-cd28932614b5
go get: added github.com/golangci/unconvert v0.0.0-20180507085042-28b1c447d1f4
go get: added github.com/google/go-cmp v0.5.4
go get: added github.com/gordonklaus/ineffassign v0.0.0-20210225214923-2e10b2664254
go get: added github.com/gostaticanalysis/analysisutil v0.4.1
go get: added github.com/gostaticanalysis/comment v1.4.1
go get: added github.com/gostaticanalysis/forcetypeassert v0.0.0-20200621232751-01d4955beaa5
go get: added github.com/gostaticanalysis/nilerr v0.1.1
go get: added github.com/hashicorp/errwrap v1.0.0
go get: added github.com/hashicorp/go-multierror v1.1.1
go get: added github.com/hashicorp/hcl v1.0.0
go get: added github.com/inconshreveable/mousetrap v1.0.0
go get: added github.com/jgautheron/goconst v1.5.1
go get: added github.com/jingyugao/rowserrcheck v1.1.0
go get: added github.com/jirfag/go-printf-func-name v0.0.0-20200119135958-7558a9eaa5af
go get: added github.com/julz/importas v0.0.0-20210419104244-841f0c0fe66d
go get: added github.com/kisielk/errcheck v1.6.0
go get: added github.com/kisielk/gotool v1.0.0
go get: added github.com/kulti/thelper v0.4.0
go get: added github.com/kunwardeep/paralleltest v1.0.2
go get: added github.com/kyoh86/exportloopref v0.1.8
go get: added github.com/ldez/gomoddirectives v0.2.1
go get: added github.com/ldez/tagliatelle v0.2.0
go get: added github.com/magiconair/properties v1.8.1
go get: added github.com/maratori/testpackage v1.0.1
go get: added github.com/matoous/godox v0.0.0-20210227103229-6504466cf951
go get: added github.com/mattn/go-colorable v0.1.8
go get: added github.com/mattn/go-isatty v0.0.12
go get: added github.com/mattn/go-runewidth v0.0.9
go get: added github.com/matttproud/golang_protobuf_extensions v1.0.1
go get: added github.com/mbilski/exhaustivestruct v1.2.0
go get: added github.com/mgechev/dots v0.0.0-20190921121421-c36f7dcfbb81
go get: added github.com/mgechev/revive v1.0.7
go get: added github.com/mitchellh/go-homedir v1.1.0
go get: added github.com/mitchellh/mapstructure v1.1.2
go get: added github.com/moricho/tparallel v0.2.1
go get: added github.com/nakabonne/nestif v0.3.0
go get: added github.com/nbutton23/zxcvbn-go v0.0.0-20210217022336-fa2cb2858354
go get: added github.com/nishanths/exhaustive v0.1.0
go get: added github.com/nishanths/predeclared v0.2.1
go get: added github.com/olekukonko/tablewriter v0.0.5
go get: added github.com/pelletier/go-toml v1.2.0
go get: added github.com/phayes/checkstyle v0.0.0-20170904204023-bfd46e6a821d
go get: added github.com/pkg/errors v0.9.1
go get: added github.com/pmezard/go-difflib v1.0.0
go get: added github.com/polyfloyd/go-errorlint v0.0.0-20210510181950-ab96adb96fea
go get: added github.com/prometheus/client_golang v1.7.1
go get: added github.com/prometheus/client_model v0.2.0
go get: added github.com/prometheus/common v0.10.0
go get: added github.com/prometheus/procfs v0.1.3
go get: added github.com/quasilyte/go-ruleguard v0.3.4
go get: added github.com/quasilyte/regex/syntax v0.0.0-20200407221936-30656e2c4a95
go get: added github.com/ryancurrah/gomodguard v1.2.2
go get: added github.com/ryanrolds/sqlclosecheck v0.3.0
go get: added github.com/sanposhiho/wastedassign/v2 v2.0.6
go get: added github.com/securego/gosec/v2 v2.8.0
go get: added github.com/shazow/go-diff v0.0.0-20160112020656-b6b7b6733b8c
go get: added github.com/sirupsen/logrus v1.8.1
go get: added github.com/sonatard/noctx v0.0.1
go get: added github.com/sourcegraph/go-diff v0.6.1
go get: added github.com/spf13/afero v1.1.2
go get: added github.com/spf13/cast v1.3.0
go get: added github.com/spf13/cobra v1.1.3
go get: added github.com/spf13/jwalterweatherman v1.0.0
go get: added github.com/spf13/pflag v1.0.5
go get: added github.com/spf13/viper v1.7.1
go get: added github.com/ssgreg/nlreturn/v2 v2.1.0
go get: added github.com/stretchr/objx v0.1.1
go get: added github.com/stretchr/testify v1.7.0
go get: added github.com/subosito/gotenv v1.2.0
go get: added github.com/tdakkota/asciicheck v0.0.0-20200416200610-e657995f937b
go get: added github.com/tetafro/godot v1.4.7
go get: added github.com/timakin/bodyclose v0.0.0-20200424151742-cb6215831a94
go get: added github.com/tomarrell/wrapcheck/v2 v2.1.0
go get: added github.com/tommy-muehle/go-mnd/v2 v2.4.0
go get: added github.com/ultraware/funlen v0.0.3
go get: added github.com/ultraware/whitespace v0.0.4
go get: added github.com/uudashr/gocognit v1.0.1
go get: added github.com/yeya24/promlinter v0.1.0
go get: added golang.org/x/mod v0.4.2
go get: added golang.org/x/sys v0.0.0-20210510120138-977fb7262007
go get: added golang.org/x/text v0.3.5
go get: added golang.org/x/tools v0.1.3
go get: added golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
go get: added google.golang.org/protobuf v1.25.0
go get: added gopkg.in/ini.v1 v1.51.0
go get: added gopkg.in/yaml.v2 v2.4.0
go get: added gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
go get: added honnef.co/go/tools v0.2.0
go get: added mvdan.cc/gofumpt v0.1.1
go get: added mvdan.cc/interfacer v0.0.0-20180901003855-c20040233aed
go get: added mvdan.cc/lint v0.0.0-20170908181259-adc824a0674b
go get: added mvdan.cc/unparam v0.0.0-20210104141923-aac4ce9116a7
./hack/lint-latest.sh
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/golangci-lint-v1.41.1 run -v
INFO [config_reader] Config search paths: [./ /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure /Users/karuppiahn/projects/github.com/kubernetes-sigs /Users/karuppiahn/projects/github.com /Users/karuppiahn/projects /Users/karuppiahn /Users /]
INFO [config_reader] Used config file .golangci.yml
INFO [lintersdb] Active 23 linters: [deadcode errcheck errorlint goconst gocyclo godot gofmt goimports golint gosec gosimple govet ineffassign interfacer misspell nakedret prealloc staticcheck structcheck unconvert unused varcheck whitespace]
INFO [loader] Go packages loading at mode 575 (exports_file|deps|files|imports|name|types_sizes|compiled_files) took 3.268213386s
WARN [runner] The linter 'interfacer' is deprecated (since v1.38.0) due to: The repository of the linter has been archived by the owner.
WARN [runner] The linter 'golint' is deprecated (since v1.41.0) due to: The repository of the linter has been archived by the owner.  Replaced by revive.
INFO [runner/filename_unadjuster] Pre-built 0 adjustments in 27.211082ms
INFO [linters context/goanalysis] analyzers took 5m38.159511285s with top 10 stages: buildir: 1m40.22871632s, buildssa: 23.468466451s, gosec: 13.483950477s, goimports: 12.852153198s, whitespace: 11.63510353s, directives: 8.136555311s, godot: 8.030978375s, nilness: 7.722521224s, golint: 7.562600135s, gofmt: 6.803966029s
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/virtualnetworks/mock_virtualnetworks by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir util/cache/ttllru/mocks by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir pkg/coalescing/mocks by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/availabilitysets/mock_availabilitysets by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/virtualmachines/mock_virtualmachines by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/networkinterfaces/mock_networkinterfaces by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir exp/controllers/mocks by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir azure/services/resourceskus/mock_resourceskus by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir azure/services/async/mock_async by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/routetables/mock_routetables by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/privatedns/mock_privatedns by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/inboundnatrules/mock_inboundnatrules by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/subnets/mock_subnets by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/tags/mock_tags by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/groups/mock_groups by pattern mock*
INFO [runner/skip dirs] Skipped 5 issues from dir internal/test/matchers/gomock by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir internal/test/mock_log by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir azure/scope/mocks by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/publicips/mock_publicips by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/bastionhosts/mocks_bastionhosts by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/vmextensions/mock_vmextensions by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/roleassignments/mock_roleassignments by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/scalesets/mock_scalesets by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/managedclusters/mock_managedclusters by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/disks/mock_disks by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/scalesetvms/mock_scalesetvms by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/vmssextensions/mock_vmssextensions by pattern mock*
INFO [runner/skip dirs] Skipped 2 issues from dir azure/services/agentpools/mock_agentpools by pattern mock*
INFO [runner/skip dirs] Skipped 3 issues from dir azure/mock_azure by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/natgateways/mock_natgateways by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/loadbalancers/mock_loadbalancers by pattern mock*
INFO [runner/skip dirs] Skipped 4 issues from dir azure/services/securitygroups/mock_securitygroups by pattern mock*
INFO [runner] Issues before processing: 604, after processing: 0
INFO [runner] Processors filtering stat (out/in): cgo: 604/604, path_prettifier: 604/604, skip_dirs: 55/175, exclude-rules: 3/55, skip_files: 175/604, autogenerated_exclude: 55/55, identifier_marker: 55/55, nolint: 0/3, exclude: 55/55, filename_unadjuster: 604/604
INFO [runner] processing took 11.901625ms with stages: path_prettifier: 7.074ms, nolint: 1.716897ms, autogenerated_exclude: 1.270153ms, identifier_marker: 587.171µs, skip_dirs: 527.81µs, skip_files: 475.342µs, exclude-rules: 182.748µs, cgo: 38.854µs, filename_unadjuster: 24.761µs, max_same_issues: 1.498µs, uniq_by_line: 688ns, max_from_linter: 248ns, source_code: 242ns, diff: 234ns, exclude: 211ns, max_per_file_from_linter: 201ns, severity-rules: 190ns, path_shortener: 157ns, sort_results: 116ns, path_prefixer: 104ns
INFO [runner] linters took 21.495439437s with stages: goanalysis_metalinter: 21.48347364s
INFO File cache stats: 362 entries of total size 2.6MiB
INFO Memory: 246 samples, avg is 1373.0MB, max is 2675.2MB
INFO Execution took 24.804261934s
cluster-api-provider-azure $ echo $?
0
cluster-api-provider-azure $ ls hack/
boilerplate			ensure-kind.sh			observability
boilerplate.go.txt		ensure-kubectl.sh		parse-prow-creds.sh
create-dev-cluster.sh		ensure-kustomize.sh		print-workspace-status.sh
create-identity-secret.sh	ensure-tags.sh			terraform-gcr-init
debugging			gen-flavors.sh			tools
ensure-acr-cleanup-schedule.sh	install-cert-manager.sh		util.sh
ensure-acr-login.sh		kustomize-sub.sh		verify-boilerplate.sh
ensure-azcli.sh			lint-latest.sh			verify-shellcheck.sh
ensure-go.sh			log				version.sh
cluster-api-provider-azure $ ls hack/tools/
bin
cluster-api-provider-azure $ ls hack/tools/bin/
golangci-lint		golangci-lint-v1.41.1
cluster-api-provider-azure $ ls hack/tools/bin/golangci-lint
hack/tools/bin/golangci-lint
cluster-api-provider-azure $ hack/tools/bin/golangci-lint
Smart, fast linters runner. Run it in cloud for every GitHub pull request on https://golangci.com

Usage:
  golangci-lint [flags]
  golangci-lint [command]

Available Commands:
  cache       Cache control and information
  completion  Output completion script
  config      Config
  help        Help
  linters     List current linters configuration
  run         Run the linters
  version     Version

Flags:
      --color string              Use color when printing; can be 'always', 'auto', or 'never' (default "auto")
  -j, --concurrency int           Concurrency (default NumCPU) (default 16)
      --cpu-profile-path string   Path to CPU profile output file
  -h, --help                      help for golangci-lint
      --mem-profile-path string   Path to memory profile output file
      --trace-path string         Path to trace output file
  -v, --verbose                   verbose output
      --version                   Print version

Use "golangci-lint [command] --help" for more information about a command.
cluster-api-provider-azure $ ./hack/tools/bin/golangci-lint
Smart, fast linters runner. Run it in cloud for every GitHub pull request on https://golangci.com

Usage:
  golangci-lint [flags]
  golangci-lint [command]

Available Commands:
  cache       Cache control and information
  completion  Output completion script
  config      Config
  help        Help
  linters     List current linters configuration
  run         Run the linters
  version     Version

Flags:
      --color string              Use color when printing; can be 'always', 'auto', or 'never' (default "auto")
  -j, --concurrency int           Concurrency (default NumCPU) (default 16)
      --cpu-profile-path string   Path to CPU profile output file
  -h, --help                      help for golangci-lint
      --mem-profile-path string   Path to memory profile output file
      --trace-path string         Path to trace output file
  -v, --verbose                   verbose output
      --version                   Print version

Use "golangci-lint [command] --help" for more information about a command.
cluster-api-provider-azure $
```

Interesting message from `rm` -

```bash
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/golangci-lint*: No such file or directory
```

Not sure where that code is, to remove existing golangci-lint binaries

Right, it's here https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/main/scripts/go_install.sh#L46

https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/main/Makefile#L242-L243

https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/main/Makefile#L48

`GO_INSTALL` is a script wrapping `go get` and I thought it was `go install` itself, hmm

---

Followed https://capz.sigs.k8s.io/developers/development.html#setting-up , except for KIND as it said an older version, but now latest version is 0.11.1

```bash
cluster-api-provider-azure $ brew install coreutils
==> Downloading https://ghcr.io/v2/homebrew/core/coreutils/manifests/8.32-2
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/coreutils/blobs/sha256:371ec57703b3646e0113331308b6e03617c2a7f91e15e
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:371ec57703b3646e0113331308b6e036
######################################################################## 100.0%
==> Pouring coreutils--8.32.big_sur.bottle.2.tar.gz
==> Caveats
Commands also provided by macOS have been installed with the prefix "g".
If you need to use these commands with their normal names, you
can add a "gnubin" directory to your PATH from your bashrc like:
  PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
==> Summary
🍺  /usr/local/Cellar/coreutils/8.32: 476 files, 12.5MB
cluster-api-provider-azure $ brew install kustomize
==> Downloading https://ghcr.io/v2/homebrew/core/kustomize/manifests/4.3.0
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/kustomize/blobs/sha256:f3d01013abedd14eb97a2bf6ff398da9427e37bd1826e
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:f3d01013abedd14eb97a2bf6ff398da9
######################################################################## 100.0%
==> Pouring kustomize--4.3.0.big_sur.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d
==> Summary
🍺  /usr/local/Cellar/kustomize/4.3.0: 8 files, 14.1MB
cluster-api-provider-azure $ GO111MODULE="on" go get sigs.k8s.io/kind@v0.9.0
go: downloading sigs.k8s.io/kind v0.9.0
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: removed sigs.k8s.io/cluster-api/test v0.4.2
go get: downgraded sigs.k8s.io/kind v0.11.1 => v0.9.0
cluster-api-provider-azure $ gst
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   go.mod
	modified:   go.sum

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gco .
Updated 2 paths from the index
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ brew install tilt-dev/tap/tilt
tilt 0.22.8 is already installed but outdated
==> Downloading https://github.com/tilt-dev/tilt/releases/download/v0.22.9/tilt.0.22.9.mac.x86_64.tar.gz
==> Downloading from https://github-releases.githubusercontent.com/143896900/3a8da8a6-390e-4ad3-a682-e56021acb3b1?X-A
######################################################################## 100.0%
==> Upgrading tilt-dev/tap/tilt
  0.22.8 -> 0.22.9

🍺  /usr/local/Cellar/tilt/0.22.9: 5 files, 80.4MB, built in 4 seconds
Removing: /usr/local/Cellar/tilt/0.22.8... (5 files, 80.3MB)
Removing: /Users/karuppiahn/Library/Caches/Homebrew/tilt--0.22.8.tar.gz... (23MB)
cluster-api-provider-azure $
```

https://capz.sigs.k8s.io/developers/development.html#using-tilt

```bash
cat <<EOF > tilt-settings.json
{
  "kustomize_substitutions": {
      "AZURE_SUBSCRIPTION_ID_B64": "$(echo "${AZURE_SUBSCRIPTION_ID}" | tr -d '\n' | base64 | tr -d '\n')",
      "AZURE_TENANT_ID_B64": "$(echo "${AZURE_TENANT_ID}" | tr -d '\n' | base64 | tr -d '\n')",
      "AZURE_CLIENT_SECRET_B64": "$(echo "${AZURE_CLIENT_SECRET}" | tr -d '\n' | base64 | tr -d '\n')",
      "AZURE_CLIENT_ID_B64": "$(echo "${AZURE_CLIENT_ID}" | tr -d '\n' | base64 | tr -d '\n')",
  }
}
EOF
```

```bash
cluster-api-provider-azure $ make tilt-up
rm -f /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst*
mkdir -p hack/tools && cd hack/tools && go build -tags=tools -o /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone github.com/drone/envsubst/v2/cmd/envsubst

ln -sf /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh sigs.k8s.io/kustomize/kustomize/v4 kustomize v4.1.3
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize*: No such file or directory
go: creating new go.mod: module fake/mod
go: downloading sigs.k8s.io/kustomize/kustomize/v4 v4.1.3
go: downloading sigs.k8s.io/kustomize/cmd/config v0.9.12
go: downloading sigs.k8s.io/kustomize/api v0.8.10
go: downloading sigs.k8s.io/kustomize/kyaml v0.10.20
go: downloading github.com/evanphx/json-patch v4.5.0+incompatible
go: downloading github.com/monochromegane/go-gitignore v0.0.0-20200626010858-205db1a8cc00
go: downloading github.com/xlab/treeprint v0.0.0-20181112141820-a009c3971eca
go: downloading go.starlark.net v0.0.0-20200306205701-8dd3e2ee1dd5
go: downloading github.com/google/shlex v0.0.0-20191202100458-e7afc7fbc510
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added github.com/PuerkitoBio/purell v1.1.1
go get: added github.com/PuerkitoBio/urlesc v0.0.0-20170810143723-de5bf2ad4578
go get: added github.com/asaskevich/govalidator v0.0.0-20190424111038-f61b66f89f4a
go get: added github.com/davecgh/go-spew v1.1.1
go get: added github.com/evanphx/json-patch v4.5.0+incompatible
go get: added github.com/go-errors/errors v1.0.1
go get: added github.com/go-openapi/jsonpointer v0.19.3
go get: added github.com/go-openapi/jsonreference v0.19.3
go get: added github.com/go-openapi/swag v0.19.5
go get: added github.com/google/shlex v0.0.0-20191202100458-e7afc7fbc510
go get: added github.com/imdario/mergo v0.3.5
go get: added github.com/inconshreveable/mousetrap v1.0.0
go get: added github.com/mailru/easyjson v0.7.0
go get: added github.com/mattn/go-runewidth v0.0.7
go get: added github.com/mitchellh/mapstructure v1.1.2
go get: added github.com/monochromegane/go-gitignore v0.0.0-20200626010858-205db1a8cc00
go get: added github.com/olekukonko/tablewriter v0.0.4
go get: added github.com/pkg/errors v0.9.1
go get: added github.com/pmezard/go-difflib v1.0.0
go get: added github.com/spf13/cobra v1.0.0
go get: added github.com/spf13/pflag v1.0.5
go get: added github.com/stretchr/testify v1.7.0
go get: added github.com/xlab/treeprint v0.0.0-20181112141820-a009c3971eca
go get: added go.starlark.net v0.0.0-20200306205701-8dd3e2ee1dd5
go get: added golang.org/x/net v0.0.0-20201110031124-69a78807bb2b
go get: added golang.org/x/text v0.3.4
go get: added gopkg.in/inf.v0 v0.9.1
go get: added gopkg.in/yaml.v2 v2.4.0
go get: added gopkg.in/yaml.v3 v3.0.0-20200615113413-eeeca48fe776
go get: added k8s.io/kube-openapi v0.0.0-20210421082810-95288971da7e
go get: added sigs.k8s.io/kustomize/api v0.8.10
go get: added sigs.k8s.io/kustomize/cmd/config v0.9.12
go get: added sigs.k8s.io/kustomize/kustomize/v4 v4.1.3
go get: added sigs.k8s.io/kustomize/kyaml v0.10.20
go get: added sigs.k8s.io/yaml v1.2.0
mkdir -p /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin
rm -f "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4*"
curl --retry 3 -fsL https://storage.googleapis.com/kubernetes-release/release/v1.21.4/bin/darwin/amd64/kubectl -o /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4
ln -sf "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4" "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl"
chmod +x "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl" "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kubectl-v1.21.4"
./scripts/kind-with-registry.sh
ERROR: failed to list clusters: command "docker ps -a --filter label=io.x-k8s.kind.cluster --format '{{.Label "io.x-k8s.kind.cluster"}}'" failed with error: exit status 1
Command Output: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
See 'docker run --help'.
make: *** [kind-create] Error 125
cluster-api-provider-azure $
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ make tilt-up
./scripts/kind-with-registry.sh
No kind clusters found.
Unable to find image 'registry:2' locally
2: Pulling from library/registry
6a428f9f83b0: Pull complete
90cad49de35d: Pull complete
b215d0b40846: Pull complete
429305b6c15c: Pull complete
6f7e10a4e907: Pull complete
Digest: sha256:265d4a5ed8bf0df27d1107edb00b70e658ee9aa5acb3f37336c5a17db634481e
Status: Downloaded newer image for registry:2
68d7cc6bf4588be08396913a859a79b50432243eb6a6fcb05a6cf5b56b383fb6
Registry Host: 172.17.0.2
Creating cluster "capz" ...
WARNING: Overriding docker network due to KIND_EXPERIMENTAL_DOCKER_NETWORK
WARNING: Here be dragons! This is not supported currently.
 ✓ Ensuring node image (kindest/node:v1.19.1) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-capz"
You can now use your cluster with:

kubectl cluster-info --context kind-capz

Thanks for using kind! 😊
node/capz-control-plane annotated
namespace/ingress-nginx created
serviceaccount/ingress-nginx created
configmap/ingress-nginx-controller created
clusterrole.rbac.authorization.k8s.io/ingress-nginx created
clusterrolebinding.rbac.authorization.k8s.io/ingress-nginx created
role.rbac.authorization.k8s.io/ingress-nginx created
rolebinding.rbac.authorization.k8s.io/ingress-nginx created
service/ingress-nginx-controller-admission created
service/ingress-nginx-controller created
deployment.apps/ingress-nginx-controller created
ingressclass.networking.k8s.io/nginx created
validatingwebhookconfiguration.admissionregistration.k8s.io/ingress-nginx-admission created
serviceaccount/ingress-nginx-admission created
clusterrole.rbac.authorization.k8s.io/ingress-nginx-admission created
clusterrolebinding.rbac.authorization.k8s.io/ingress-nginx-admission created
role.rbac.authorization.k8s.io/ingress-nginx-admission created
rolebinding.rbac.authorization.k8s.io/ingress-nginx-admission created
job.batch/ingress-nginx-admission-create created
job.batch/ingress-nginx-admission-patch created
node/capz-control-plane condition met
pod/ingress-nginx-controller-756b8f4b6f-ljzkf condition met
EXP_CLUSTER_RESOURCE_SET=true EXP_AKS=true EXP_MACHINE_POOL=true tilt up
Tilt started on http://localhost:10350/
v0.22.9, built 2021-09-17

(space) to open the browser
(s) to stream logs (--stream=true)
(t) to open legacy terminal mode (--legacy=true)
(ctrl-c) to exit
```

```bash
cluster-api-provider-azure $ make kind-reset
kind delete cluster --name=capz || true
Deleting cluster "capz" ...
kind delete cluster --name=capz-e2e || true
Deleting cluster "capz-e2e" ...
cluster-api-provider-azure $
```

---

The comment in https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1667 talking about this issue - https://github.com/kubernetes-sigs/cluster-api-provider-azure/pull/1667#discussion_r711231453

---

```bash
Initial Build • (Tiltfile)
Loading Tiltfile at: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/Tiltfile
Traceback (most recent call last):
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/Tiltfile:28:26: in <toplevel>
  <builtin>: in read_json
Error: error parsing JSON from tilt-settings.json: invalid character '}' looking for beginning of object key string

Loading Tiltfile at: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/Tiltfile
Traceback (most recent call last):
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/Tiltfile:28:26: in <toplevel>
  <builtin>: in read_json
Error: error parsing JSON from tilt-settings.json: invalid character '}' looking for beginning of object key string
```

---

```bash
cluster-api-provider-azure $ make create-workload-cluster
# Create workload Cluster.
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/cluster-template.yaml | kubectl apply -f -
cluster.cluster.x-k8s.io/capz-cluster created
azurecluster.infrastructure.cluster.x-k8s.io/capz-cluster created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-cluster-control-plane created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-control-plane created
machinedeployment.cluster.x-k8s.io/capz-cluster-md-0 created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-cluster-md-0 created
error: error validating "STDIN": error validating data: [ValidationError(AzureClusterIdentity.spec): missing required field "clientID" in io.x-k8s.cluster.infrastructure.v1alpha4.AzureClusterIdentity.spec, ValidationError(AzureClusterIdentity.spec): missing required field "tenantID" in io.x-k8s.cluster.infrastructure.v1alpha4.AzureClusterIdentity.spec]; if you choose to ignore these errors, turn validation off with --validate=false
make: *** [create-workload-cluster] Error 1
cluster-api-provider-azure $ gst
On branch fix-1698
Your branch is up to date with 'origin/fix-1698'.

nothing to commit, working tree clean
cluster-api-provider-azure $ gco main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

cluster-api-provider-azure $ # Cluster settings.
cluster-api-provider-azure $ export CLUSTER_NAME="capz-cluster"
cluster-api-provider-azure $ export AZURE_VNET_NAME=${CLUSTER_NAME}-vnet
cluster-api-provider-azure $
cluster-api-provider-azure $ # Azure settings.
cluster-api-provider-azure $ export AZURE_LOCATION="southcentralus"
cluster-api-provider-azure $ export AZURE_RESOURCE_GROUP=${CLUSTER_NAME}
cluster-api-provider-azure $ export AZURE_SUBSCRIPTION_ID_B64="$(echo -n "$AZURE_SUBSCRIPTION_ID" | base64 | tr -d '\n')"
cluster-api-provider-azure $ export AZURE_TENANT_ID_B64="$(echo -n "$AZURE_TENANT_ID" | base64 | tr -d '\n')"
cluster-api-provider-azure $ export AZURE_CLIENT_ID_B64="$(echo -n "$AZURE_CLIENT_ID" | base64 | tr -d '\n')"
cluster-api-provider-azure $ export AZURE_CLIENT_SECRET_B64="$(echo -n "$AZURE_CLIENT_SECRET" | base64 | tr -d '\n')"
cluster-api-provider-azure $
cluster-api-provider-azure $ # Machine settings.
cluster-api-provider-azure $ export CONTROL_PLANE_MACHINE_COUNT=3
cluster-api-provider-azure $ export AZURE_CONTROL_PLANE_MACHINE_TYPE="Standard_D2s_v3"
cluster-api-provider-azure $ export AZURE_NODE_MACHINE_TYPE="Standard_D2s_v3"
cluster-api-provider-azure $ export WORKER_MACHINE_COUNT=2
cluster-api-provider-azure $ export KUBERNETES_VERSION="v1.22.1"
cluster-api-provider-azure $
cluster-api-provider-azure $ # Generate SSH key.
cluster-api-provider-azure $ # If you want to provide your own key, skip this step and set AZURE_SSH_PUBLIC_KEY_B64 to your existing file.
cluster-api-provider-azure $ SSH_KEY_FILE=.sshkey
cluster-api-provider-azure $ rm -f "${SSH_KEY_FILE}" 2>/dev/null
ssh-keygen -t rsa -b 2048 -f "${SSH_KEY_FILE}" -N '' 1>/dev/null
echo "Machine SSH key generated in ${SSH_KEY_FILE}"
# For Linux the ssh key needs to be b64 encoded because we use the azure api to set it
# Windows doesn't support setting ssh keys so we use cloudbase-init to set which doesn't require base64
export AZURE_SSH_PUBLIC_KEY_B64=$(cat "${SSH_KEY_FILE}.pub" | base64 | tr -d '\r\n')
export AZURE_SSH_PUBLIC_KEY=$(cat "${SSH_KEY_FILE}.pub" | tr -d '\r\n')
cluster-api-provider-azure $ ssh-keygen -t rsa -b 2048 -f "${SSH_KEY_FILE}" -N '' 1>/dev/null
cluster-api-provider-azure $ echo "Machine SSH key generated in ${SSH_KEY_FILE}"
Machine SSH key generated in .sshkey
cluster-api-provider-azure $ # For Linux the ssh key needs to be b64 encoded because we use the azure api to set it
cluster-api-provider-azure $ # Windows doesn't support setting ssh keys so we use cloudbase-init to set which doesn't require base64
cluster-api-provider-azure $ export AZURE_SSH_PUBLIC_KEY_B64=$(cat "${SSH_KEY_FILE}.pub" | base64 | tr -d '\r\n')
cluster-api-provider-azure $ export AZURE_SSH_PUBLIC_KEY=$(cat "${SSH_KEY_FILE}.pub" | tr -d '\r\n')
cluster-api-provider-azure $
cluster-api-provider-azure $ make create-workload-cluster
# Create workload Cluster.
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/cluster-template.yaml | kubectl apply -f -
cluster.cluster.x-k8s.io/capz-cluster unchanged
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-cluster-control-plane configured
machinedeployment.cluster.x-k8s.io/capz-cluster-md-0 unchanged
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-cluster-md-0 unchanged
Error from server (Invalid): error when applying patch:
{"metadata":{"annotations":{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureCluster\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster\",\"namespace\":\"default\"},\"spec\":{\"identityRef\":{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureClusterIdentity\",\"name\":null},\"location\":\"southcentralus\",\"networkSpec\":{\"vnet\":{\"name\":\"capz-cluster-vnet\"}},\"resourceGroup\":\"capz-cluster\",\"subscriptionID\":\"dummy-subscription-id\"}}\n"}},"spec":{"subscriptionID":"dummy-subscription-id"}}
to:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azureclusters", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureCluster"
Name: "capz-cluster", Namespace: "default"
for: "STDIN": admission webhook "validation.azurecluster.infrastructure.cluster.x-k8s.io" denied the request: AzureCluster.infrastructure.cluster.x-k8s.io "capz-cluster" is invalid: spec.SubscriptionID: Invalid value: "dummy-subscription-id": field is immutable
Error from server (Invalid): error when applying patch:
{"metadata":{"annotations":{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureMachineTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster-control-plane\",\"namespace\":\"default\"},\"spec\":{\"template\":{\"spec\":{\"dataDisks\":[{\"diskSizeGB\":256,\"lun\":0,\"nameSuffix\":\"etcddisk\"}],\"osDisk\":{\"diskSizeGB\":128,\"osType\":\"Linux\"},\"sshPublicKey\":\"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==\",\"vmSize\":\"Standard_D2s_v3\"}}}}\n"}},"spec":{"template":{"spec":{"dataDisks":[{"diskSizeGB":256,"lun":0,"nameSuffix":"etcddisk"}],"sshPublicKey":"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg=="}}}}
to:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azuremachinetemplates", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureMachineTemplate"
Name: "capz-cluster-control-plane", Namespace: "default"
for: "STDIN": admission webhook "validation.azuremachinetemplate.infrastructure.cluster.x-k8s.io" denied the request: AzureMachineTemplate.infrastructure.cluster.x-k8s.io "capz-cluster-control-plane" is invalid: AzureMachineTemplate.spec.template.spec: Invalid value: v1alpha4.AzureMachineTemplate{TypeMeta:v1.TypeMeta{Kind:"AzureMachineTemplate", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4"}, ObjectMeta:v1.ObjectMeta{Name:"capz-cluster-control-plane", GenerateName:"", Namespace:"default", SelfLink:"", UID:"289bb9c6-27ea-414c-9c87-00889cd53fa1", ResourceVersion:"27309", Generation:2, CreationTimestamp:time.Date(2021, time.September, 20, 12, 45, 22, 0, time.Local), DeletionTimestamp:<nil>, DeletionGracePeriodSeconds:(*int64)(nil), Labels:map[string]string(nil), Annotations:map[string]string{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureMachineTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster-control-plane\",\"namespace\":\"default\"},\"spec\":{\"template\":{\"spec\":{\"dataDisks\":[{\"diskSizeGB\":256,\"lun\":0,\"nameSuffix\":\"etcddisk\"}],\"osDisk\":{\"diskSizeGB\":128,\"osType\":\"Linux\"},\"sshPublicKey\":\"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==\",\"vmSize\":\"Standard_D2s_v3\"}}}}\n"}, OwnerReferences:[]v1.OwnerReference(nil), Finalizers:[]string(nil), ClusterName:"", ManagedFields:[]v1.ManagedFieldsEntry{v1.ManagedFieldsEntry{Manager:"kubectl-client-side-apply", Operation:"Update", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4", Time:time.Date(2021, time.September, 20, 12, 46, 29, 0, time.Local), FieldsType:"FieldsV1", FieldsV1:(*v1.FieldsV1)(0xc00000c138)}}}, Spec:v1alpha4.AzureMachineTemplateSpec{Template:v1alpha4.AzureMachineTemplateResource{Spec:v1alpha4.AzureMachineSpec{ProviderID:(*string)(nil), VMSize:"Standard_D2s_v3", FailureDomain:(*string)(nil), Image:(*v1alpha4.Image)(nil), Identity:"None", UserAssignedIdentities:[]v1alpha4.UserAssignedIdentity(nil), RoleAssignmentName:"", OSDisk:v1alpha4.OSDisk{OSType:"Linux", DiskSizeGB:(*int32)(0xc000e69020), ManagedDisk:(*v1alpha4.ManagedDiskParameters)(nil), DiffDiskSettings:(*v1alpha4.DiffDiskSettings)(nil), CachingType:"None"}, DataDisks:[]v1alpha4.DataDisk{v1alpha4.DataDisk{NameSuffix:"etcddisk", DiskSizeGB:256, ManagedDisk:(*v1alpha4.ManagedDiskParameters)(nil), Lun:(*int32)(0xc000e68f4c), CachingType:"ReadWrite"}}, SSHPublicKey:"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==", AdditionalTags:v1alpha4.Tags(nil), AllocatePublicIP:false, EnableIPForwarding:false, AcceleratedNetworking:(*bool)(nil), SpotVMOptions:(*v1alpha4.SpotVMOptions)(nil), SecurityProfile:(*v1alpha4.SecurityProfile)(nil), SubnetName:""}}}}: AzureMachineTemplate spec.template.spec field is immutable. Please create new resource instead. ref doc: https://cluster-api.sigs.k8s.io/tasks/change-machine-template.html
Error from server (Invalid): error when applying patch:
{"metadata":{"annotations":{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureMachineTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster-md-0\",\"namespace\":\"default\"},\"spec\":{\"template\":{\"spec\":{\"osDisk\":{\"diskSizeGB\":128,\"osType\":\"Linux\"},\"sshPublicKey\":\"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==\",\"vmSize\":\"Standard_D2s_v3\"}}}}\n"}},"spec":{"template":{"spec":{"sshPublicKey":"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg=="}}}}
to:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azuremachinetemplates", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureMachineTemplate"
Name: "capz-cluster-md-0", Namespace: "default"
for: "STDIN": admission webhook "validation.azuremachinetemplate.infrastructure.cluster.x-k8s.io" denied the request: AzureMachineTemplate.infrastructure.cluster.x-k8s.io "capz-cluster-md-0" is invalid: AzureMachineTemplate.spec.template.spec: Invalid value: v1alpha4.AzureMachineTemplate{TypeMeta:v1.TypeMeta{Kind:"AzureMachineTemplate", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4"}, ObjectMeta:v1.ObjectMeta{Name:"capz-cluster-md-0", GenerateName:"", Namespace:"default", SelfLink:"", UID:"90e9dc73-2b8e-43b3-9893-e6433eab78ef", ResourceVersion:"27324", Generation:2, CreationTimestamp:time.Date(2021, time.September, 20, 12, 45, 22, 0, time.Local), DeletionTimestamp:<nil>, DeletionGracePeriodSeconds:(*int64)(nil), Labels:map[string]string(nil), Annotations:map[string]string{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureMachineTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster-md-0\",\"namespace\":\"default\"},\"spec\":{\"template\":{\"spec\":{\"osDisk\":{\"diskSizeGB\":128,\"osType\":\"Linux\"},\"sshPublicKey\":\"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==\",\"vmSize\":\"Standard_D2s_v3\"}}}}\n"}, OwnerReferences:[]v1.OwnerReference{v1.OwnerReference{APIVersion:"cluster.x-k8s.io/v1alpha4", Kind:"Cluster", Name:"capz-cluster", UID:"e9325de2-92df-4309-bf6d-c44222f3b47c", Controller:(*bool)(nil), BlockOwnerDeletion:(*bool)(nil)}}, Finalizers:[]string(nil), ClusterName:"", ManagedFields:[]v1.ManagedFieldsEntry{v1.ManagedFieldsEntry{Manager:"manager", Operation:"Update", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4", Time:time.Date(2021, time.September, 20, 12, 45, 23, 0, time.Local), FieldsType:"FieldsV1", FieldsV1:(*v1.FieldsV1)(0xc00000c2b8)}, v1.ManagedFieldsEntry{Manager:"kubectl-client-side-apply", Operation:"Update", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4", Time:time.Date(2021, time.September, 20, 12, 46, 29, 0, time.Local), FieldsType:"FieldsV1", FieldsV1:(*v1.FieldsV1)(0xc00000c318)}}}, Spec:v1alpha4.AzureMachineTemplateSpec{Template:v1alpha4.AzureMachineTemplateResource{Spec:v1alpha4.AzureMachineSpec{ProviderID:(*string)(nil), VMSize:"Standard_D2s_v3", FailureDomain:(*string)(nil), Image:(*v1alpha4.Image)(nil), Identity:"None", UserAssignedIdentities:[]v1alpha4.UserAssignedIdentity(nil), RoleAssignmentName:"", OSDisk:v1alpha4.OSDisk{OSType:"Linux", DiskSizeGB:(*int32)(0xc000e69f10), ManagedDisk:(*v1alpha4.ManagedDiskParameters)(nil), DiffDiskSettings:(*v1alpha4.DiffDiskSettings)(nil), CachingType:"None"}, DataDisks:[]v1alpha4.DataDisk(nil), SSHPublicKey:"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==", AdditionalTags:v1alpha4.Tags(nil), AllocatePublicIP:false, EnableIPForwarding:false, AcceleratedNetworking:(*bool)(nil), SpotVMOptions:(*v1alpha4.SpotVMOptions)(nil), SecurityProfile:(*v1alpha4.SecurityProfile)(nil), SubnetName:""}}}}: AzureMachineTemplate spec.template.spec field is immutable. Please create new resource instead. ref doc: https://cluster-api.sigs.k8s.io/tasks/change-machine-template.html
error when retrieving current configuration of:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azureclusteridentities", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureClusterIdentity"
Name: "", Namespace: "default"
from server for: "STDIN": resource name may not be empty
make: *** [create-workload-cluster] Error 1
cluster-api-provider-azure $

cluster-api-provider-azure $ make delete-workload-cluster
Your Azure resources will now be deleted, this can take up to 20 minutes
kubectl delete cluster capz-cluster
cluster.cluster.x-k8s.io "capz-cluster" deleted
cluster-api-provider-azure $

cluster-api-provider-azure $ make create-workload-cluster
# Create workload Cluster.
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/cluster-template.yaml | kubectl apply -f -
cluster.cluster.x-k8s.io/capz-cluster created
azurecluster.infrastructure.cluster.x-k8s.io/capz-cluster created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-cluster-control-plane created
machinedeployment.cluster.x-k8s.io/capz-cluster-md-0 created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-cluster-md-0 created
Error from server (Invalid): error when applying patch:
{"metadata":{"annotations":{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureMachineTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster-control-plane\",\"namespace\":\"default\"},\"spec\":{\"template\":{\"spec\":{\"dataDisks\":[{\"diskSizeGB\":256,\"lun\":0,\"nameSuffix\":\"etcddisk\"}],\"osDisk\":{\"diskSizeGB\":128,\"osType\":\"Linux\"},\"sshPublicKey\":\"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==\",\"vmSize\":\"Standard_D2s_v3\"}}}}\n"}},"spec":{"template":{"spec":{"dataDisks":[{"diskSizeGB":256,"lun":0,"nameSuffix":"etcddisk"}],"sshPublicKey":"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg=="}}}}
to:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azuremachinetemplates", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureMachineTemplate"
Name: "capz-cluster-control-plane", Namespace: "default"
for: "STDIN": admission webhook "validation.azuremachinetemplate.infrastructure.cluster.x-k8s.io" denied the request: AzureMachineTemplate.infrastructure.cluster.x-k8s.io "capz-cluster-control-plane" is invalid: AzureMachineTemplate.spec.template.spec: Invalid value: v1alpha4.AzureMachineTemplate{TypeMeta:v1.TypeMeta{Kind:"AzureMachineTemplate", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4"}, ObjectMeta:v1.ObjectMeta{Name:"capz-cluster-control-plane", GenerateName:"", Namespace:"default", SelfLink:"", UID:"289bb9c6-27ea-414c-9c87-00889cd53fa1", ResourceVersion:"27309", Generation:2, CreationTimestamp:time.Date(2021, time.September, 20, 12, 45, 22, 0, time.Local), DeletionTimestamp:<nil>, DeletionGracePeriodSeconds:(*int64)(nil), Labels:map[string]string(nil), Annotations:map[string]string{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"infrastructure.cluster.x-k8s.io/v1alpha4\",\"kind\":\"AzureMachineTemplate\",\"metadata\":{\"annotations\":{},\"name\":\"capz-cluster-control-plane\",\"namespace\":\"default\"},\"spec\":{\"template\":{\"spec\":{\"dataDisks\":[{\"diskSizeGB\":256,\"lun\":0,\"nameSuffix\":\"etcddisk\"}],\"osDisk\":{\"diskSizeGB\":128,\"osType\":\"Linux\"},\"sshPublicKey\":\"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==\",\"vmSize\":\"Standard_D2s_v3\"}}}}\n"}, OwnerReferences:[]v1.OwnerReference(nil), Finalizers:[]string(nil), ClusterName:"", ManagedFields:[]v1.ManagedFieldsEntry{v1.ManagedFieldsEntry{Manager:"kubectl-client-side-apply", Operation:"Update", APIVersion:"infrastructure.cluster.x-k8s.io/v1alpha4", Time:time.Date(2021, time.September, 20, 12, 47, 58, 0, time.Local), FieldsType:"FieldsV1", FieldsV1:(*v1.FieldsV1)(0xc0006984c8)}}}, Spec:v1alpha4.AzureMachineTemplateSpec{Template:v1alpha4.AzureMachineTemplateResource{Spec:v1alpha4.AzureMachineSpec{ProviderID:(*string)(nil), VMSize:"Standard_D2s_v3", FailureDomain:(*string)(nil), Image:(*v1alpha4.Image)(nil), Identity:"None", UserAssignedIdentities:[]v1alpha4.UserAssignedIdentity(nil), RoleAssignmentName:"", OSDisk:v1alpha4.OSDisk{OSType:"Linux", DiskSizeGB:(*int32)(0xc001139a30), ManagedDisk:(*v1alpha4.ManagedDiskParameters)(nil), DiffDiskSettings:(*v1alpha4.DiffDiskSettings)(nil), CachingType:"None"}, DataDisks:[]v1alpha4.DataDisk{v1alpha4.DataDisk{NameSuffix:"etcddisk", DiskSizeGB:256, ManagedDisk:(*v1alpha4.ManagedDiskParameters)(nil), Lun:(*int32)(0xc0011399ec), CachingType:"ReadWrite"}}, SSHPublicKey:"c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBREFRQUJBQUFCQVFDMnRRUDV5ZTFnL0FnTEVrWFZ5MWJVMXFwbUxxZjF0dmVCSU80VTNRRUJISkMvT3RIa0czbzNhZVlzTU9VblZLMldMTHZURWF6Q1JVWk9aZVB1QkRWbERvazhFL2tnNmlVTEtlSVc2ZkpURXZCUVQ2UE56UWwvYUZ2YXc2cHcxZ2JtdFlWZTNWRmxsRzYrWkRQbzlkbWZUeFFLZDIwRG9JaGdobkdTMlNvQmlPVGVlUmV3djRhVXdLUWxFR1BHMlJXZnhDckx0UjB2WDRWUUZ0MHBnVnRualgrR2RxRXNqMHhYMFpEeUJWSFdXR3dIRFJsRGhhczA3VDNTNWxsY1NtOS9PdU5VQk5PY0pvc2hUOXAwN2Vrc05Kd3NndmtjMTcxeHNScklyN3U1MUtFamd3MFlGYVB0N1BWOHVyYXgyTGl2UDAydXNrRENmVmtJZGo0SWE3WnQga2FydXBwaWFobkBrYXJ1cHBpYWhuLWEwMS52bXdhcmUuY29tCg==", AdditionalTags:v1alpha4.Tags(nil), AllocatePublicIP:false, EnableIPForwarding:false, AcceleratedNetworking:(*bool)(nil), SpotVMOptions:(*v1alpha4.SpotVMOptions)(nil), SecurityProfile:(*v1alpha4.SecurityProfile)(nil), SubnetName:""}}}}: AzureMachineTemplate spec.template.spec field is immutable. Please create new resource instead. ref doc: https://cluster-api.sigs.k8s.io/tasks/change-machine-template.html
error when retrieving current configuration of:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azureclusteridentities", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureClusterIdentity"
Name: "", Namespace: "default"
from server for: "STDIN": resource name may not be empty
make: *** [create-workload-cluster] Error 1
cluster-api-provider-azure $

```

```bash
cluster-api-provider-azure $ make delete-workload-cluster
Your Azure resources will now be deleted, this can take up to 20 minutes
kubectl delete cluster capz-cluster
cluster.cluster.x-k8s.io "capz-cluster" deleted
cluster-api-provider-azure $ ktx
Switched to context "kind-capz".
cluster-api-provider-azure $ k get crds
NAME                                                         CREATED AT
alertmanagerconfigs.monitoring.coreos.com                    2021-09-20T11:44:37Z
alertmanagers.monitoring.coreos.com                          2021-09-20T11:44:37Z
azureclusteridentities.infrastructure.cluster.x-k8s.io       2021-09-20T11:44:37Z
azureclusters.infrastructure.cluster.x-k8s.io                2021-09-20T11:44:37Z
azureidentities.aadpodidentity.k8s.io                        2021-09-20T11:44:37Z
azureidentitybindings.aadpodidentity.k8s.io                  2021-09-20T11:44:37Z
azuremachinepoolmachines.infrastructure.cluster.x-k8s.io     2021-09-20T11:44:37Z
azuremachinepools.infrastructure.cluster.x-k8s.io            2021-09-20T11:44:37Z
azuremachines.infrastructure.cluster.x-k8s.io                2021-09-20T11:44:37Z
azuremachinetemplates.infrastructure.cluster.x-k8s.io        2021-09-20T11:44:37Z
azuremanagedclusters.infrastructure.cluster.x-k8s.io         2021-09-20T11:44:37Z
azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io    2021-09-20T11:44:37Z
azuremanagedmachinepools.infrastructure.cluster.x-k8s.io     2021-09-20T11:44:37Z
azurepodidentityexceptions.aadpodidentity.k8s.io             2021-09-20T11:44:37Z
certificaterequests.cert-manager.io                          2021-09-20T11:42:57Z
certificates.cert-manager.io                                 2021-09-20T11:42:57Z
challenges.acme.cert-manager.io                              2021-09-20T11:42:57Z
clusterclasses.cluster.x-k8s.io                              2021-09-20T11:43:38Z
clusterissuers.cert-manager.io                               2021-09-20T11:42:58Z
clusterresourcesetbindings.addons.cluster.x-k8s.io           2021-09-20T11:43:38Z
clusterresourcesets.addons.cluster.x-k8s.io                  2021-09-20T11:43:38Z
clusters.cluster.x-k8s.io                                    2021-09-20T11:43:38Z
issuers.cert-manager.io                                      2021-09-20T11:42:58Z
kubeadmconfigs.bootstrap.cluster.x-k8s.io                    2021-09-20T11:43:38Z
kubeadmconfigtemplates.bootstrap.cluster.x-k8s.io            2021-09-20T11:43:38Z
kubeadmcontrolplanes.controlplane.cluster.x-k8s.io           2021-09-20T11:43:38Z
kubeadmcontrolplanetemplates.controlplane.cluster.x-k8s.io   2021-09-20T11:43:38Z
machinedeployments.cluster.x-k8s.io                          2021-09-20T11:43:38Z
machinehealthchecks.cluster.x-k8s.io                         2021-09-20T11:43:38Z
machinepools.cluster.x-k8s.io                                2021-09-20T11:43:38Z
machines.cluster.x-k8s.io                                    2021-09-20T11:43:38Z
machinesets.cluster.x-k8s.io                                 2021-09-20T11:43:38Z
orders.acme.cert-manager.io                                  2021-09-20T11:42:58Z
podmonitors.monitoring.coreos.com                            2021-09-20T11:44:37Z
probes.monitoring.coreos.com                                 2021-09-20T11:44:37Z
prometheuses.monitoring.coreos.com                           2021-09-20T11:44:37Z
prometheusrules.monitoring.coreos.com                        2021-09-20T11:44:37Z
servicemonitors.monitoring.coreos.com                        2021-09-20T11:44:37Z
thanosrulers.monitoring.coreos.com                           2021-09-20T11:44:38Z
cluster-api-provider-azure $ k get crds | rg azure
azureclusteridentities.infrastructure.cluster.x-k8s.io       2021-09-20T11:44:37Z
azureclusters.infrastructure.cluster.x-k8s.io                2021-09-20T11:44:37Z
azureidentities.aadpodidentity.k8s.io                        2021-09-20T11:44:37Z
azureidentitybindings.aadpodidentity.k8s.io                  2021-09-20T11:44:37Z
azuremachinepoolmachines.infrastructure.cluster.x-k8s.io     2021-09-20T11:44:37Z
azuremachinepools.infrastructure.cluster.x-k8s.io            2021-09-20T11:44:37Z
azuremachines.infrastructure.cluster.x-k8s.io                2021-09-20T11:44:37Z
azuremachinetemplates.infrastructure.cluster.x-k8s.io        2021-09-20T11:44:37Z
azuremanagedclusters.infrastructure.cluster.x-k8s.io         2021-09-20T11:44:37Z
azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io    2021-09-20T11:44:37Z
azuremanagedmachinepools.infrastructure.cluster.x-k8s.io     2021-09-20T11:44:37Z
azurepodidentityexceptions.aadpodidentity.k8s.io             2021-09-20T11:44:37Z
cluster-api-provider-azure $ k get azuremachines
No resources found in default namespace.
cluster-api-provider-azure $ k get azuremachines -A
No resources found
cluster-api-provider-azure $ k get machines -A
No resources found
cluster-api-provider-azure $ k get azuremachinetemplate -A
NAMESPACE   NAME                         AGE
default     capz-cluster-control-plane   3m57s
cluster-api-provider-azure $ k get azuremachinetemplate -o name
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-control-plane
cluster-api-provider-azure $ k get azuremachinetemplate -o name | xargs kubectl delete
azuremachinetemplate.infrastructure.cluster.x-k8s.io "capz-cluster-control-plane" deleted
cluster-api-provider-azure $ k get azuremachinetemplate -A
No resources found
cluster-api-provider-azure $ k get azuremachinetemplate -A
cluster-api-provider-azure $ k get crds -o name | less
cluster-api-provider-azure $ k get crds -o name | xargs azure
xargs: azure: No such file or directory
cluster-api-provider-azure $ k get crds -o name | rg azure
customresourcedefinition.apiextensions.k8s.io/azureclusteridentities.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azureclusters.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azureidentities.aadpodidentity.k8s.io
customresourcedefinition.apiextensions.k8s.io/azureidentitybindings.aadpodidentity.k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremachinepoolmachines.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremachinepools.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremachines.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremachinetemplates.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremanagedclusters.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azuremanagedmachinepools.infrastructure.cluster.x-k8s.io
customresourcedefinition.apiextensions.k8s.io/azurepodidentityexceptions.aadpodidentity.k8s.io
cluster-api-provider-azure $ k get crds -o name | rg azure | xargs kubectl get
NAME                                                        CREATED AT
azureclusteridentities.infrastructure.cluster.x-k8s.io      2021-09-20T11:44:37Z
azureclusters.infrastructure.cluster.x-k8s.io               2021-09-20T11:44:37Z
azureidentities.aadpodidentity.k8s.io                       2021-09-20T11:44:37Z
azureidentitybindings.aadpodidentity.k8s.io                 2021-09-20T11:44:37Z
azuremachinepoolmachines.infrastructure.cluster.x-k8s.io    2021-09-20T11:44:37Z
azuremachinepools.infrastructure.cluster.x-k8s.io           2021-09-20T11:44:37Z
azuremachines.infrastructure.cluster.x-k8s.io               2021-09-20T11:44:37Z
azuremachinetemplates.infrastructure.cluster.x-k8s.io       2021-09-20T11:44:37Z
azuremanagedclusters.infrastructure.cluster.x-k8s.io        2021-09-20T11:44:37Z
azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io   2021-09-20T11:44:37Z
azuremanagedmachinepools.infrastructure.cluster.x-k8s.io    2021-09-20T11:44:37Z
azurepodidentityexceptions.aadpodidentity.k8s.io            2021-09-20T11:44:37Z
cluster-api-provider-azure $ k get crds | less
cluster-api-provider-azure $ k get crds -o json | less
cluster-api-provider-azure $ k get crds -o jsonpath={.metadata.name} | less
cluster-api-provider-azure $ k get crds -o jsonpath={.metadata.name} | less
cluster-api-provider-azure $ k get crds -o json | less
cluster-api-provider-azure $ k get crds -o jsonpath={.items[*].metadata.name} | less
cluster-api-provider-azure $ k get crds -o jsonpath={.items[*].metadata.name} | xargs kubectl get
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "alertmanagers.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureclusteridentities.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureclusters.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureidentities.aadpodidentity.k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureidentitybindings.aadpodidentity.k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachinepoolmachines.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachinepools.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachines.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachinetemplates.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremanagedclusters.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremanagedmachinepools.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azurepodidentityexceptions.aadpodidentity.k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "certificaterequests.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "certificates.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "challenges.acme.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterclasses.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterissuers.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterresourcesetbindings.addons.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterresourcesets.addons.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusters.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "issuers.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmconfigs.bootstrap.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmconfigtemplates.bootstrap.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmcontrolplanes.controlplane.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmcontrolplanetemplates.controlplane.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinedeployments.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinehealthchecks.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinepools.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machines.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinesets.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "orders.acme.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "podmonitors.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "probes.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "prometheuses.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "prometheusrules.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "servicemonitors.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "thanosrulers.monitoring.coreos.com" not found
cluster-api-provider-azure $ k get crds -o jsonpath={.items[*].metadata.name} | xargs kubectl get
cluster-api-provider-azure $ k get crds -o jsonpath={.items[*].metadata.name} | less
cluster-api-provider-azure $ k get crds --no-headers | less
cluster-api-provider-azure $ k get crds --no-headers | awk '{print $1}' | less
cluster-api-provider-azure $ k get crds --no-headers | awk '{print $1}' | xargs kubectl get
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "alertmanagers.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureclusteridentities.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureclusters.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureidentities.aadpodidentity.k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azureidentitybindings.aadpodidentity.k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachinepoolmachines.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachinepools.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachines.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremachinetemplates.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremanagedclusters.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azuremanagedmachinepools.infrastructure.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "azurepodidentityexceptions.aadpodidentity.k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "certificaterequests.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "certificates.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "challenges.acme.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterclasses.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterissuers.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterresourcesetbindings.addons.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusterresourcesets.addons.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "clusters.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "issuers.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmconfigs.bootstrap.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmconfigtemplates.bootstrap.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmcontrolplanes.controlplane.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "kubeadmcontrolplanetemplates.controlplane.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinedeployments.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinehealthchecks.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinepools.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machines.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "machinesets.cluster.x-k8s.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "orders.acme.cert-manager.io" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "podmonitors.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "probes.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "prometheuses.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "prometheusrules.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "servicemonitors.monitoring.coreos.com" not found
Error from server (NotFound): alertmanagerconfigs.monitoring.coreos.com "thanosrulers.monitoring.coreos.com" not found
cluster-api-provider-azure $ k get crds --no-headers | awk '{print $1}' | xargs -I{} echo {}
alertmanagerconfigs.monitoring.coreos.com
alertmanagers.monitoring.coreos.com
azureclusteridentities.infrastructure.cluster.x-k8s.io
azureclusters.infrastructure.cluster.x-k8s.io
azureidentities.aadpodidentity.k8s.io
azureidentitybindings.aadpodidentity.k8s.io
azuremachinepoolmachines.infrastructure.cluster.x-k8s.io
azuremachinepools.infrastructure.cluster.x-k8s.io
azuremachines.infrastructure.cluster.x-k8s.io
azuremachinetemplates.infrastructure.cluster.x-k8s.io
azuremanagedclusters.infrastructure.cluster.x-k8s.io
azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io
azuremanagedmachinepools.infrastructure.cluster.x-k8s.io
azurepodidentityexceptions.aadpodidentity.k8s.io
certificaterequests.cert-manager.io
certificates.cert-manager.io
challenges.acme.cert-manager.io
clusterclasses.cluster.x-k8s.io
clusterissuers.cert-manager.io
clusterresourcesetbindings.addons.cluster.x-k8s.io
clusterresourcesets.addons.cluster.x-k8s.io
clusters.cluster.x-k8s.io
issuers.cert-manager.io
kubeadmconfigs.bootstrap.cluster.x-k8s.io
kubeadmconfigtemplates.bootstrap.cluster.x-k8s.io
kubeadmcontrolplanes.controlplane.cluster.x-k8s.io
kubeadmcontrolplanetemplates.controlplane.cluster.x-k8s.io
machinedeployments.cluster.x-k8s.io
machinehealthchecks.cluster.x-k8s.io
machinepools.cluster.x-k8s.io
machines.cluster.x-k8s.io
machinesets.cluster.x-k8s.io
orders.acme.cert-manager.io
podmonitors.monitoring.coreos.com
probes.monitoring.coreos.com
prometheuses.monitoring.coreos.com
prometheusrules.monitoring.coreos.com
servicemonitors.monitoring.coreos.com
thanosrulers.monitoring.coreos.com
cluster-api-provider-azure $ k get crds --no-headers | awk '{print $1}' | xargs -I{} kubectl get {}
No resources found in default namespace.
No resources found in default namespace.
No resources found in default namespace.
No resources found in default namespace.
No resources found in default namespace.
^C
cluster-api-provider-azure $ k get crds --no-headers | awk '{print $1}' | rg azure | xargs -I{} kubectl get {} -A
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ make create-workload-cluster
# Create workload Cluster.
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/cluster-template.yaml | kubectl apply -f -
cluster.cluster.x-k8s.io/capz-cluster created
azurecluster.infrastructure.cluster.x-k8s.io/capz-cluster created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-cluster-control-plane created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-control-plane created
machinedeployment.cluster.x-k8s.io/capz-cluster-md-0 created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-cluster-md-0 created
error: error when retrieving current configuration of:
Resource: "infrastructure.cluster.x-k8s.io/v1alpha4, Resource=azureclusteridentities", GroupVersionKind: "infrastructure.cluster.x-k8s.io/v1alpha4, Kind=AzureClusterIdentity"
Name: "", Namespace: "default"
from server for: "STDIN": resource name may not be empty
make: *** [create-workload-cluster] Error 1
cluster-api-provider-azure $ make delete-workload-cluster
Your Azure resources will now be deleted, this can take up to 20 minutes
kubectl delete cluster capz-cluster
cluster.cluster.x-k8s.io "capz-cluster" deleted

cluster-api-provider-azure $
cluster-api-provider-azure $ k get crds --no-headers | awk '{print $1}' | rg azure | xargs -I{} kubectl get {} -A
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
NAMESPACE   NAME                         AGE
default     capz-cluster-control-plane   78s
No resources found
No resources found
No resources found
No resources found
cluster-api-provider-azure $ k get azuremachinetemplate -o name | xargs kubectl delete
azuremachinetemplate.infrastructure.cluster.x-k8s.io "capz-cluster-control-plane" deleted
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ make create-workload-cluster
# Create workload Cluster.
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/cluster-template.yaml | kubectl apply -f -
cluster.cluster.x-k8s.io/capz-cluster created
azurecluster.infrastructure.cluster.x-k8s.io/capz-cluster created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-cluster-control-plane created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-control-plane created
machinedeployment.cluster.x-k8s.io/capz-cluster-md-0 created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-cluster-md-0 created
azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
# Wait for the kubeconfig to become available.
timeout --foreground 300 bash -c "while ! kubectl get secrets | grep capz-cluster-kubeconfig; do sleep 1; done"
capz-cluster-kubeconfig                 cluster.x-k8s.io/secret               1      0s
# Get kubeconfig and store it locally.
kubectl get secrets capz-cluster-kubeconfig -o json | jq -r .data.value | base64 --decode > ./kubeconfig
timeout --foreground 600 bash -c "while ! kubectl --kubeconfig=./kubeconfig get nodes | grep master; do sleep 1; done"
error: the server doesn't have a resource type "nodes"
capz-cluster-control-plane-4mqhn   NotReady   control-plane,master   2s    v1.22.1
run "kubectl --kubeconfig=./kubeconfig ..." to work with the new target cluster
cluster-api-provider-azure $ export KUBECONFIG=kubeconfig
kubeconfig
cluster-api-provider-azure $ export KUBECONFIG=kubeconfig
cluster-api-provider-azure $ k get nodes
NAME                               STATUS   ROLES                  AGE   VERSION
capz-cluster-control-plane-4mqhn   Ready    control-plane,master   60m   v1.22.1
capz-cluster-control-plane-hznhg   Ready    control-plane,master   58m   v1.22.1
capz-cluster-control-plane-xzhpq   Ready    control-plane,master   55m   v1.22.1
capz-cluster-md-0-26bbp            Ready    <none>                 58m   v1.22.1
capz-cluster-md-0-snjmz            Ready    <none>                 58m   v1.22.1
cluster-api-provider-azure $ k get nodes
NAME                               STATUS   ROLES                  AGE   VERSION
capz-cluster-control-plane-4mqhn   Ready    control-plane,master   68m   v1.22.1
capz-cluster-control-plane-hznhg   Ready    control-plane,master   66m   v1.22.1
capz-cluster-control-plane-xzhpq   Ready    control-plane,master   63m   v1.22.1
capz-cluster-md-0-26bbp            Ready    <none>                 66m   v1.22.1
capz-cluster-md-0-snjmz            Ready    <none>                 66m   v1.22.1
cluster-api-provider-azure $ ktx
error: you did not choose any of the options
cluster-api-provider-azure $ k get crds
NAME                                                  CREATED AT
bgpconfigurations.crd.projectcalico.org               2021-09-20T13:15:23Z
bgppeers.crd.projectcalico.org                        2021-09-20T13:15:24Z
blockaffinities.crd.projectcalico.org                 2021-09-20T13:15:24Z
clusterinformations.crd.projectcalico.org             2021-09-20T13:15:24Z
felixconfigurations.crd.projectcalico.org             2021-09-20T13:15:24Z
globalnetworkpolicies.crd.projectcalico.org           2021-09-20T13:15:25Z
globalnetworksets.crd.projectcalico.org               2021-09-20T13:15:25Z
hostendpoints.crd.projectcalico.org                   2021-09-20T13:15:25Z
ipamblocks.crd.projectcalico.org                      2021-09-20T13:15:26Z
ipamconfigs.crd.projectcalico.org                     2021-09-20T13:15:26Z
ipamhandles.crd.projectcalico.org                     2021-09-20T13:15:26Z
ippools.crd.projectcalico.org                         2021-09-20T13:15:26Z
kubecontrollersconfigurations.crd.projectcalico.org   2021-09-20T13:15:27Z
networkpolicies.crd.projectcalico.org                 2021-09-20T13:15:27Z
networksets.crd.projectcalico.org                     2021-09-20T13:15:27Z
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ ktx
Switched to context "kind-capz".
cluster-api-provider-azure $ cluster
cluster     clusterctl  clusterdb
cluster-api-provider-azure $ clusterctl
Get started with Cluster API using clusterctl to create a management cluster,
install providers, and create templates for your workload cluster.

Usage:
  clusterctl [command]

Available Commands:
  alpha       Commands for features in alpha.
  backup      Backup Cluster API objects and all dependencies from a management cluster.
  completion  Output shell completion code for the specified shell (bash or zsh)
  config      Display clusterctl configuration.
  delete      Delete one or more providers from the management cluster.
  describe    Describe workload clusters.
  generate    Generate yaml using clusterctl yaml processor.
  get         Get info from a management or a workload cluster
  help        Help about any command
  init        Initialize a management cluster.
  move        Move Cluster API objects and all dependencies between management clusters.
  restore     Restore Cluster API objects from file by glob. Object files are searched in config directory
  upgrade     Upgrade core and provider components in a management cluster.
  version     Print clusterctl version.

Flags:
      --config $HOME/.cluster-api/clusterctl.yaml   Path to clusterctl configuration (default is $HOME/.cluster-api/clusterctl.yaml) or to a remote location (i.e. https://example.com/clusterctl.yaml)
  -h, --help                                        help for clusterctl
  -v, --v int                                       Set the log level verbosity. This overrides the CLUSTERCTL_LOG_LEVEL environment variable.

Use "clusterctl [command] --help" for more information about a command.
cluster-api-provider-azure $ clusterctl get
Get info from a management or a workload cluster

Usage:
  clusterctl get [command]

Available Commands:
  kubeconfig  Gets the kubeconfig file for accessing a workload cluster

Flags:
  -h, --help   help for get

Global Flags:
      --config $HOME/.cluster-api/clusterctl.yaml   Path to clusterctl configuration (default is $HOME/.cluster-api/clusterctl.yaml) or to a remote location (i.e. https://example.com/clusterctl.yaml)
  -v, --v int                                       Set the log level verbosity. This overrides the CLUSTERCTL_LOG_LEVEL environment variable.

Use "clusterctl get [command] --help" for more information about a command.
cluster-api-provider-azure $ clusterctl describe
Describe the status of workload clusters.

Usage:
  clusterctl describe [command]

Available Commands:
  cluster     Describe workload clusters.

Flags:
  -h, --help   help for describe

Global Flags:
      --config $HOME/.cluster-api/clusterctl.yaml   Path to clusterctl configuration (default is $HOME/.cluster-api/clusterctl.yaml) or to a remote location (i.e. https://example.com/clusterctl.yaml)
  -v, --v int                                       Set the log level verbosity. This overrides the CLUSTERCTL_LOG_LEVEL environment variable.

Use "clusterctl describe [command] --help" for more information about a command.
cluster-api-provider-azure $ clusterctl describe cluster
Error: accepts 1 arg(s), received 0
cluster-api-provider-azure $ clusterctl describe cluster -h
Provide an "at glance" view of a Cluster API cluster designed to help the user in quickly
understanding if there are problems and where.
.

Usage:
  clusterctl describe cluster [flags]

Examples:
  # Describe the cluster named test-1.
  clusterctl describe cluster test-1

  # Describe the cluster named test-1 showing all the conditions for the KubeadmControlPlane object kind.
  clusterctl describe cluster test-1 --show-conditions KubeadmControlPlane

  # Describe the cluster named test-1 showing all the conditions for a specific machine.
  clusterctl describe cluster test-1 --show-conditions Machine/m1

  # Describe the cluster named test-1 disabling automatic grouping of objects with the same ready condition
  # e.g. un-group all the machines with Ready=true instead of showing a single group node.
  clusterctl describe cluster test-1 --disable-grouping

  # Describe the cluster named test-1 disabling automatic echo suppression
  # e.g. show the infrastructure machine objects, no matter if the current state is already reported by the machine's Ready condition.
  clusterctl describe cluster test-1

Flags:
      --disable-grouping            Disable grouping machines when ready condition has the same Status, Severity and Reason.
      --disable-no-echo             Disable hiding of a MachineInfrastructure and BootstrapConfig when ready condition is true or it has the Status, Severity and Reason of the machine's object.
  -h, --help                        help for cluster
      --kubeconfig string           Path to a kubeconfig file to use for the management cluster. If empty, default discovery rules apply.
      --kubeconfig-context string   Context to be used within the kubeconfig file. If empty, current context will be used.
  -n, --namespace string            The namespace where the workload cluster is located. If unspecified, the current namespace will be used.
      --show-conditions string       list of comma separated kind or kind/name for which the command should show all the object's conditions (use 'all' to show conditions for everything).

Global Flags:
      --config $HOME/.cluster-api/clusterctl.yaml   Path to clusterctl configuration (default is $HOME/.cluster-api/clusterctl.yaml) or to a remote location (i.e. https://example.com/clusterctl.yaml)
  -v, --v int                                       Set the log level verbosity. This overrides the CLUSTERCTL_LOG_LEVEL environment variable.
cluster-api-provider-azure $ clusterctl describe cluster capz-cluster
NAME                                                             READY  SEVERITY  REASON  SINCE  MESSAGE
/capz-cluster                                                    True                     71m
├─ClusterInfrastructure - AzureCluster/capz-cluster              True                     80m
├─ControlPlane - KubeadmControlPlane/capz-cluster-control-plane  True                     71m
│ └─3 Machines...                                                True                     18m    See capz-cluster-control-plane-2lfxs, capz-cluster-control-plane-7f8vg, ...
└─Workers
  └─MachineDeployment/capz-cluster-md-0                          True                     76m
    └─2 Machines...                                              True                     76m    See capz-cluster-md-0-598fdf57-xxv7h, capz-cluster-md-0-598fdf57-znvdk
cluster-api-provider-azure $ clusterctl move -h
Move Cluster API objects and all dependencies between management clusters.

Note: The destination cluster MUST have the required provider components installed.

Usage:
  clusterctl move [flags]

Examples:
  Move Cluster API objects and all dependencies between management clusters.
  clusterctl move --to-kubeconfig=target-kubeconfig.yaml

Flags:
      --dry-run                        Enable dry run, don't really perform the move actions
  -h, --help                           help for move
      --kubeconfig string              Path to the kubeconfig file for the source management cluster. If unspecified, default discovery rules apply.
      --kubeconfig-context string      Context to be used within the kubeconfig file for the source management cluster. If empty, current context will be used.
  -n, --namespace string               The namespace where the workload cluster is hosted. If unspecified, the current context's namespace is used.
      --to-kubeconfig string           Path to the kubeconfig file to use for the destination management cluster.
      --to-kubeconfig-context string   Context to be used within the kubeconfig file for the destination management cluster. If empty, current context will be used.

Global Flags:
      --config $HOME/.cluster-api/clusterctl.yaml   Path to clusterctl configuration (default is $HOME/.cluster-api/clusterctl.yaml) or to a remote location (i.e. https://example.com/clusterctl.yaml)
  -v, --v int                                       Set the log level verbosity. This overrides the CLUSTERCTL_LOG_LEVEL environment variable.
cluster-api-provider-azure $ clusterctl backup
Error: please specify a directory to backup cluster API objects to using the --directory flag
cluster-api-provider-azure $ clusterctl backup -h
Backup Cluster API objects and all dependencies from a management cluster.

Usage:
  clusterctl backup [flags]

Examples:
  Backup Cluster API objects and all dependencies from a management cluster.
  clusterctl backup --directory=/tmp/backup-directory

Flags:
      --directory string            The directory to save Cluster API objects to as yaml files
  -h, --help                        help for backup
      --kubeconfig string           Path to the kubeconfig file for the source management cluster to backup. If unspecified, default discovery rules apply.
      --kubeconfig-context string   Context to be used within the kubeconfig file for the source management cluster. If empty, current context will be used.
  -n, --namespace string            The namespace where the workload cluster is hosted. If unspecified, the current context's namespace is used.

Global Flags:
      --config $HOME/.cluster-api/clusterctl.yaml   Path to clusterctl configuration (default is $HOME/.cluster-api/clusterctl.yaml) or to a remote location (i.e. https://example.com/clusterctl.yaml)
  -v, --v int                                       Set the log level verbosity. This overrides the CLUSTERCTL_LOG_LEVEL environment variable.
cluster-api-provider-azure $ clusterctl backup --directory
cluster-api-provider-azure $ mkdir ~/capz-cluster-demo
cluster-api-provider-azure $ clusterctl backup --directory ~/capz-cluster-demo/
Performing backup...
Discovering Cluster API objects
Starting backup of Cluster API objects Clusters=0
Saving files to /Users/karuppiahn/capz-cluster-demo/
cluster-api-provider-azure $ ls ~/capz-cluster-demo/
cluster-api-provider-azure $ clusterctl backup --directory ~/capz-cluster-demo/ --kubeconfig kubeconfig
Error: failed to check Cluster API version: customresourcedefinitions.apiextensions.k8s.io "clusters.cluster.x-k8s.io" not found
cluster-api-provider-azure $ clusterctl backup --directory ~/capz-cluster-demo/ --kubeconfig-context kind-capz
Performing backup...
Discovering Cluster API objects
Starting backup of Cluster API objects Clusters=0
Saving files to /Users/karuppiahn/capz-cluster-demo/
cluster-api-provider-azure $ k get clusters
NAME           PHASE
capz-cluster   Provisioned
cluster-api-provider-azure $ k get clusters -A
NAMESPACE   NAME           PHASE
default     capz-cluster   Provisioned
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ ktx
Switched to context "capz-cluster-admin@capz-cluster".
cluster-api-provider-azure $ k get pods -A
NAMESPACE     NAME                                                       READY   STATUS    RESTARTS      AGE
kube-system   calico-kube-controllers-846b5f484d-h5qcj                   1/1     Running   0             98m
kube-system   calico-node-ffgqc                                          1/1     Running   0             96m
kube-system   calico-node-jndnv                                          1/1     Running   0             93m
kube-system   calico-node-kgtbz                                          1/1     Running   0             96m
kube-system   calico-node-ksqmm                                          1/1     Running   1 (96m ago)   96m
kube-system   calico-node-q42gv                                          1/1     Running   0             98m
kube-system   coredns-78fcd69978-2lx95                                   1/1     Running   0             98m
kube-system   coredns-78fcd69978-xrv9j                                   1/1     Running   0             98m
kube-system   etcd-capz-cluster-control-plane-4mqhn                      1/1     Running   0             98m
kube-system   etcd-capz-cluster-control-plane-hznhg                      1/1     Running   0             96m
kube-system   etcd-capz-cluster-control-plane-xzhpq                      1/1     Running   0             93m
kube-system   kube-apiserver-capz-cluster-control-plane-4mqhn            1/1     Running   0             98m
kube-system   kube-apiserver-capz-cluster-control-plane-hznhg            1/1     Running   0             96m
kube-system   kube-apiserver-capz-cluster-control-plane-xzhpq            1/1     Running   0             93m
kube-system   kube-controller-manager-capz-cluster-control-plane-4mqhn   1/1     Running   1 (96m ago)   98m
kube-system   kube-controller-manager-capz-cluster-control-plane-hznhg   1/1     Running   0             96m
kube-system   kube-controller-manager-capz-cluster-control-plane-xzhpq   1/1     Running   0             93m
kube-system   kube-proxy-5rgvj                                           1/1     Running   0             96m
kube-system   kube-proxy-6g8zj                                           1/1     Running   0             96m
kube-system   kube-proxy-d7znt                                           1/1     Running   0             98m
kube-system   kube-proxy-j5nb5                                           1/1     Running   0             93m
kube-system   kube-proxy-jhb27                                           1/1     Running   0             96m
kube-system   kube-scheduler-capz-cluster-control-plane-4mqhn            1/1     Running   1 (96m ago)   98m
kube-system   kube-scheduler-capz-cluster-control-plane-hznhg            1/1     Running   0             96m
kube-system   kube-scheduler-capz-cluster-control-plane-xzhpq            1/1     Running   0             93m
cluster-api-provider-azure $

cluster-api-provider-azure $ k get crds
NAME                                                  CREATED AT
bgpconfigurations.crd.projectcalico.org               2021-09-20T13:15:23Z
bgppeers.crd.projectcalico.org                        2021-09-20T13:15:24Z
blockaffinities.crd.projectcalico.org                 2021-09-20T13:15:24Z
clusterinformations.crd.projectcalico.org             2021-09-20T13:15:24Z
felixconfigurations.crd.projectcalico.org             2021-09-20T13:15:24Z
globalnetworkpolicies.crd.projectcalico.org           2021-09-20T13:15:25Z
globalnetworksets.crd.projectcalico.org               2021-09-20T13:15:25Z
hostendpoints.crd.projectcalico.org                   2021-09-20T13:15:25Z
ipamblocks.crd.projectcalico.org                      2021-09-20T13:15:26Z
ipamconfigs.crd.projectcalico.org                     2021-09-20T13:15:26Z
ipamhandles.crd.projectcalico.org                     2021-09-20T13:15:26Z
ippools.crd.projectcalico.org                         2021-09-20T13:15:26Z
kubecontrollersconfigurations.crd.projectcalico.org   2021-09-20T13:15:27Z
networkpolicies.crd.projectcalico.org                 2021-09-20T13:15:27Z
networksets.crd.projectcalico.org                     2021-09-20T13:15:27Z
cluster-api-provider-azure $

cluster-api-provider-azure $ k get all -A
NAMESPACE     NAME                                                           READY   STATUS    RESTARTS      AGE
kube-system   pod/calico-kube-controllers-846b5f484d-h5qcj                   1/1     Running   0             98m
kube-system   pod/calico-node-ffgqc                                          1/1     Running   0             97m
kube-system   pod/calico-node-jndnv                                          1/1     Running   0             93m
kube-system   pod/calico-node-kgtbz                                          1/1     Running   0             96m
kube-system   pod/calico-node-ksqmm                                          1/1     Running   1 (96m ago)   97m
kube-system   pod/calico-node-q42gv                                          1/1     Running   0             98m
kube-system   pod/coredns-78fcd69978-2lx95                                   1/1     Running   0             98m
kube-system   pod/coredns-78fcd69978-xrv9j                                   1/1     Running   0             98m
kube-system   pod/etcd-capz-cluster-control-plane-4mqhn                      1/1     Running   0             98m
kube-system   pod/etcd-capz-cluster-control-plane-hznhg                      1/1     Running   0             96m
kube-system   pod/etcd-capz-cluster-control-plane-xzhpq                      1/1     Running   0             93m
kube-system   pod/kube-apiserver-capz-cluster-control-plane-4mqhn            1/1     Running   0             98m
kube-system   pod/kube-apiserver-capz-cluster-control-plane-hznhg            1/1     Running   0             96m
kube-system   pod/kube-apiserver-capz-cluster-control-plane-xzhpq            1/1     Running   0             93m
kube-system   pod/kube-controller-manager-capz-cluster-control-plane-4mqhn   1/1     Running   1 (96m ago)   98m
kube-system   pod/kube-controller-manager-capz-cluster-control-plane-hznhg   1/1     Running   0             96m
kube-system   pod/kube-controller-manager-capz-cluster-control-plane-xzhpq   1/1     Running   0             93m
kube-system   pod/kube-proxy-5rgvj                                           1/1     Running   0             96m
kube-system   pod/kube-proxy-6g8zj                                           1/1     Running   0             97m
kube-system   pod/kube-proxy-d7znt                                           1/1     Running   0             98m
kube-system   pod/kube-proxy-j5nb5                                           1/1     Running   0             93m
kube-system   pod/kube-proxy-jhb27                                           1/1     Running   0             97m
kube-system   pod/kube-scheduler-capz-cluster-control-plane-4mqhn            1/1     Running   1 (96m ago)   98m
kube-system   pod/kube-scheduler-capz-cluster-control-plane-hznhg            1/1     Running   0             96m
kube-system   pod/kube-scheduler-capz-cluster-control-plane-xzhpq            1/1     Running   0             93m

NAMESPACE     NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
default       service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP                  98m
kube-system   service/kube-dns     ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   98m

NAMESPACE     NAME                         DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system   daemonset.apps/calico-node   5         5         5       5            5           kubernetes.io/os=linux   98m
kube-system   daemonset.apps/kube-proxy    5         5         5       5            5           kubernetes.io/os=linux   98m

NAMESPACE     NAME                                      READY   UP-TO-DATE   AVAILABLE   AGE
kube-system   deployment.apps/calico-kube-controllers   1/1     1            1           98m
kube-system   deployment.apps/coredns                   2/2     2            2           98m

NAMESPACE     NAME                                                 DESIRED   CURRENT   READY   AGE
kube-system   replicaset.apps/calico-kube-controllers-846b5f484d   1         1         1       98m
kube-system   replicaset.apps/coredns-78fcd69978                   2         2         2       98m
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ make delete-workload-cluster
Your Azure resources will now be deleted, this can take up to 20 minutes
kubectl delete cluster
error: resource(s) were provided, but no name was specified
make: *** [delete-workload-cluster] Error 1
cluster-api-provider-azure $ CLUSTER_NAME=capz-cluster make delete-workload-cluster
Your Azure resources will now be deleted, this can take up to 20 minutes
kubectl delete cluster capz-cluster
cluster.cluster.x-k8s.io "capz-cluster" deleted
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ make generate-go
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh sigs.k8s.io/controller-tools/cmd/controller-gen controller-gen v0.6.1
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/controller-gen*: No such file or directory
go: creating new go.mod: module fake/mod
go: downloading sigs.k8s.io/controller-tools v0.6.1

go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added github.com/fatih/color v1.12.0
go get: added github.com/go-logr/logr v0.4.0
go get: added github.com/gobuffalo/flect v0.2.3
go get: added github.com/gogo/protobuf v1.3.2
go get: added github.com/google/go-cmp v0.5.6
go get: added github.com/google/gofuzz v1.1.0
go get: added github.com/inconshreveable/mousetrap v1.0.0
go get: added github.com/json-iterator/go v1.1.10
go get: added github.com/mattn/go-colorable v0.1.8
go get: added github.com/mattn/go-isatty v0.0.12
go get: added github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd
go get: added github.com/modern-go/reflect2 v1.0.1
go get: added github.com/spf13/cobra v1.1.3
go get: added github.com/spf13/pflag v1.0.5
go get: added golang.org/x/mod v0.4.2
go get: added golang.org/x/net v0.0.0-20210428140749-89ef3d95e781
go get: added golang.org/x/sys v0.0.0-20210510120138-977fb7262007
go get: added golang.org/x/text v0.3.6
go get: added golang.org/x/tools v0.1.3
go get: added golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
go get: added gopkg.in/inf.v0 v0.9.1
go get: added gopkg.in/yaml.v2 v2.4.0
go get: added gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
go get: added k8s.io/api v0.21.2
go get: added k8s.io/apiextensions-apiserver v0.21.2
go get: added k8s.io/apimachinery v0.21.2
go get: added k8s.io/klog/v2 v2.8.0
go get: added k8s.io/utils v0.0.0-20201110183641-67b214c5f920
go get: added sigs.k8s.io/controller-tools v0.6.1
go get: added sigs.k8s.io/structured-merge-diff/v4 v4.1.0
go get: added sigs.k8s.io/yaml v1.2.0
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh github.com/golang/mock/mockgen mockgen v1.6.0
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/mockgen*: No such file or directory
go: creating new go.mod: module fake/mod
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added github.com/golang/mock v1.6.0
go get: added golang.org/x/mod v0.4.2
go get: added golang.org/x/sys v0.0.0-20210510120138-977fb7262007
go get: added golang.org/x/tools v0.1.1
go get: added golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh k8s.io/code-generator/cmd/conversion-gen conversion-gen v0.21.2
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/conversion-gen*: No such file or directory
go: creating new go.mod: module fake/mod
go: downloading golang.org/x/mod v0.3.1-0.20200828183125-ce943fd02449
go: downloading golang.org/x/sys v0.0.0-20210426230700-d19ff857e887
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added github.com/go-logr/logr v0.4.0
go get: added github.com/spf13/pflag v1.0.5
go get: added golang.org/x/mod v0.3.1-0.20200828183125-ce943fd02449
go get: added golang.org/x/sys v0.0.0-20210426230700-d19ff857e887
go get: added golang.org/x/tools v0.1.0
go get: added golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
go get: added k8s.io/code-generator v0.21.2
go get: added k8s.io/gengo v0.0.0-20201214224949-b6c5ce23f027
go get: added k8s.io/klog/v2 v2.8.0
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/controller-gen-v0.6.1 \
		paths=./api/... \
		paths=./exp/api/... \
		object:headerFile=./hack/boilerplate/boilerplate.generatego.txt
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/conversion-gen-v0.21.2 \
		--input-dirs=./api/v1alpha3 \
		--build-tag=ignore_autogenerated_core_v1alpha3 \
		--extra-peer-dirs=sigs.k8s.io/cluster-api/api/v1alpha3 \
		--output-file-base=zz_generated.conversion \
		--go-header-file=./hack/boilerplate/boilerplate.generatego.txt --output-base=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure


/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/conversion-gen-v0.21.2 \
		--input-dirs=./exp/api/v1alpha3 \
		--output-file-base=zz_generated.conversion \
		--go-header-file=./hack/boilerplate/boilerplate.generatego.txt --output-base=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure



go generate ./...
cluster-api-provider-azure $
cluster-api-provider-azure $
cluster-api-provider-azure $
cluster-api-provider-azure $
cluster-api-provider-azure $
cluster-api-provider-azure $
cluster-api-provider-azure $ gst
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   api/v1alpha3/zz_generated.conversion.go
	modified:   api/v1alpha3/zz_generated.deepcopy.go
	modified:   api/v1alpha4/zz_generated.deepcopy.go
	modified:   exp/api/v1alpha3/zz_generated.conversion.go
	modified:   exp/api/v1alpha3/zz_generated.deepcopy.go
	modified:   exp/api/v1alpha4/zz_generated.deepcopy.go

no changes added to commit (use "git add" and/or "git commit -a")
cluster-api-provider-azure $ gd
diff --git a/api/v1alpha3/zz_generated.conversion.go b/api/v1alpha3/zz_generated.conversion.go
index 904a328d..28901c0f 100644
--- a/api/v1alpha3/zz_generated.conversion.go
+++ b/api/v1alpha3/zz_generated.conversion.go
@@ -1,3 +1,4 @@
+//go:build !ignore_autogenerated_core_v1alpha3
 // +build !ignore_autogenerated_core_v1alpha3

 /*
diff --git a/api/v1alpha3/zz_generated.deepcopy.go b/api/v1alpha3/zz_generated.deepcopy.go
index 9e335e49..25868ace 100644
--- a/api/v1alpha3/zz_generated.deepcopy.go
+++ b/api/v1alpha3/zz_generated.deepcopy.go
@@ -1,3 +1,4 @@
+//go:build !ignore_autogenerated
 // +build !ignore_autogenerated

 /*
diff --git a/api/v1alpha4/zz_generated.deepcopy.go b/api/v1alpha4/zz_generated.deepcopy.go
index 030a972a..0f77e6e9 100644
--- a/api/v1alpha4/zz_generated.deepcopy.go
+++ b/api/v1alpha4/zz_generated.deepcopy.go
@@ -1,3 +1,4 @@
+//go:build !ignore_autogenerated
 // +build !ignore_autogenerated

 /*
diff --git a/exp/api/v1alpha3/zz_generated.conversion.go b/exp/api/v1alpha3/zz_generated.conversion.go
index 0407aeb3..6a5bf647 100644
--- a/exp/api/v1alpha3/zz_generated.conversion.go
+++ b/exp/api/v1alpha3/zz_generated.conversion.go
@@ -1,3 +1,4 @@
+//go:build !ignore_autogenerated
 // +build !ignore_autogenerated

 /*
diff --git a/exp/api/v1alpha3/zz_generated.deepcopy.go b/exp/api/v1alpha3/zz_generated.deepcopy.go
index 2df50d7a..c97f3306 100644
--- a/exp/api/v1alpha3/zz_generated.deepcopy.go
+++ b/exp/api/v1alpha3/zz_generated.deepcopy.go
@@ -1,3 +1,4 @@
+//go:build !ignore_autogenerated
 // +build !ignore_autogenerated

 /*
diff --git a/exp/api/v1alpha4/zz_generated.deepcopy.go b/exp/api/v1alpha4/zz_generated.deepcopy.go
index af9417c4..d3b47b31 100644
--- a/exp/api/v1alpha4/zz_generated.deepcopy.go
+++ b/exp/api/v1alpha4/zz_generated.deepcopy.go
@@ -1,3 +1,4 @@
+//go:build !ignore_autogenerated
 // +build !ignore_autogenerated

 /*
cluster-api-provider-azure $ ./scripts/ci-e2e.sh
Detected kind version: kind.
Requires v0.10.0 or greater.
Please install v0.10.0 or later.
cluster-api-provider-azure $ kind
kind creates and manages local Kubernetes clusters using Docker container 'nodes'

Usage:
  kind [command]

Available Commands:
  build       Build one of [node-image]
  completion  Output shell completion code for the specified shell (bash, zsh or fish)
  create      Creates one of [cluster]
  delete      Deletes one of [cluster]
  export      Exports one of [kubeconfig, logs]
  get         Gets one of [clusters, nodes, kubeconfig]
  help        Help about any command
  load        Loads images into nodes
  version     Prints the kind CLI version

Flags:
  -h, --help              help for kind
      --loglevel string   DEPRECATED: see -v instead
  -q, --quiet             silence all stderr output
  -v, --verbosity int32   info log verbosity
      --version           version for kind

Use "kind [command] --help" for more information about a command.
cluster-api-provider-azure $ kind version
kind v0.9.0 go1.17 darwin/amd64
cluster-api-provider-azure $ which kind
/Users/karuppiahn/go/bin/kind
cluster-api-provider-azure $ rm -rfv ~/go/bin/kind
/Users/karuppiahn/go/bin/kind
cluster-api-provider-azure $ which kind
/usr/local/bin/kind
cluster-api-provider-azure $ kind version
-bash: /Users/karuppiahn/go/bin/kind: No such file or directory
cluster-api-provider-azure $ source ~/.bash_profile
cluster-api-provider-azure $ kind version
kind v0.11.1 go1.16.4 darwin/amd64
cluster-api-provider-azure $ ./scripts/ci-e2e.sh

./scripts/ci-e2e.sh: line 43: AZURE_SUBSCRIPTION_ID: Environment variable empty or not defined.
```

```bash
cluster-api-provider-azure $ ./scripts/ci-e2e.sh
generating sshkey for e2e
PULL_POLICY=IfNotPresent MANAGER_IMAGE=localhost:5000/ci-e2e/cluster-api-azure-controller-amd64:20210920145157 \
	/Library/Developer/CommandLineTools/usr/bin/make docker-build \
	GINKGO_ARGS='-stream --progress ' \
	test-e2e-run
docker pull docker/dockerfile:1.1-experimental
1.1-experimental: Pulling from docker/dockerfile
612615616619: Pull complete
Digest: sha256:de85b2f3a3e8a2f7fe48e8e84a65f6fdd5cd5183afa6412fff9caa6871649c44
Status: Downloaded newer image for docker/dockerfile:1.1-experimental
docker.io/docker/dockerfile:1.1-experimental
docker pull docker.io/library/golang:1.16
1.16: Pulling from library/golang
955615a668ce: Already exists
2756ef5f69a5: Already exists
911ea9f2bd51: Already exists
27b0a22ee906: Already exists
4e94c8ba5874: Already exists
261c19c9b43e: Already exists
ba66844146b3: Already exists
Digest: sha256:0056b049979bfcf13ac2ede60b810349396fab1d510cb60701503dccd01f9153
Status: Downloaded newer image for golang:1.16
docker.io/library/golang:1.16
docker pull gcr.io/distroless/static:latest
latest: Pulling from distroless/static
b49b96595fd4: Already exists
Digest: sha256:912bd2c2b9704ead25ba91b631e3849d940f9d533f0c15cf4fc625099ad145b1
Status: Downloaded newer image for gcr.io/distroless/static:latest
gcr.io/distroless/static:latest
DOCKER_BUILDKIT=1 docker build --build-arg goproxy=https://proxy.golang.org,direct --build-arg ARCH=amd64 --build-arg ldflags="-X 'sigs.k8s.io/cluster-api-provider-azure/version.buildDate=2021-09-20T14:51:57Z' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitCommit=2c7203980539027b74e41e92c2a439865ec1b721' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitTreeState=dirty' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitMajor=0' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitMinor=5' -X 'sigs.k8s.io/cluster-api-provider-azure/version.gitVersion=v0.5.2-45-2c720398053902-dirty'" . -t localhost:5000/ci-e2e/cluster-api-azure-controller-amd64:20210920145157
[+] Building 158.2s (19/19) FINISHED
 => [internal] load build definition from Dockerfile                                                            0.0s
 => => transferring dockerfile: 2.09kB                                                                          0.0s
 => [internal] load .dockerignore                                                                               0.0s
 => => transferring context: 204B                                                                               0.0s
 => resolve image config for docker.io/docker/dockerfile:1.1-experimental                                       0.0s
 => docker-image://docker.io/docker/dockerfile:1.1-experimental                                                 0.0s
 => [internal] load build definition from Dockerfile                                                            0.0s
 => => transferring dockerfile: 2.09kB                                                                          0.0s
 => [internal] load metadata for gcr.io/distroless/static:nonroot                                               3.0s
 => [internal] load metadata for docker.io/library/golang:1.16                                                  0.0s
 => CACHED [builder 1/8] FROM docker.io/library/golang:1.16                                                     0.0s
 => [internal] load build context                                                                               0.1s
 => => transferring context: 2.91MB                                                                             0.1s
 => [stage-1 1/3] FROM gcr.io/distroless/static:nonroot@sha256:be5d77c62dbe7fedfb0a4e5ec2f91078080800ab1f18358  0.0s
 => => resolve gcr.io/distroless/static:nonroot@sha256:be5d77c62dbe7fedfb0a4e5ec2f91078080800ab1f18358e5f31fcc  0.0s
 => => sha256:421f180b71d8b30bd89af1273bb832698b79b14ed686ba9f2fe9b07b38f5db76 478B / 478B                      0.0s
 => => sha256:be5d77c62dbe7fedfb0a4e5ec2f91078080800ab1f18358e5f31fcc8faa023c4 1.67kB / 1.67kB                  0.0s
 => => sha256:c070202f5ea785303a9f8cfc5f094d210336e3e0ef09806b2edcce3d5e223eb7 426B / 426B                      0.0s
 => [builder 2/8] WORKDIR /workspace                                                                            0.0s
 => [builder 3/8] COPY go.mod go.mod                                                                            0.0s
 => [builder 4/8] COPY go.sum go.sum                                                                            0.0s
 => [builder 5/8] RUN --mount=type=cache,target=/go/pkg/mod     go mod download                                46.7s
 => [builder 6/8] COPY ./ ./                                                                                    0.1s
 => [builder 7/8] RUN --mount=type=cache,target=/root/.cache/go-build     --mount=type=cache,target=/go/pkg/m  59.4s
 => [builder 8/8] RUN --mount=type=cache,target=/root/.cache/go-build     --mount=type=cache,target=/go/pkg/m  47.8s
 => [stage-1 2/3] COPY --from=builder /workspace/manager .                                                      0.1s
 => exporting to image                                                                                          0.3s
 => => exporting layers                                                                                         0.3s
 => => writing image sha256:bca0c2ec1c9b74b5c5a1bb6c64b152d25dcf0c1bff65cf8215fb357e79f31f37                    0.0s
 => => naming to localhost:5000/ci-e2e/cluster-api-azure-controller-amd64:20210920145157                        0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
/Library/Developer/CommandLineTools/usr/bin/make set-manifest-image MANIFEST_IMG=localhost:5000/ci-e2e/cluster-api-azure-controller-amd64 MANIFEST_TAG=20210920145157 TARGET_RESOURCE="./config/default/manager_image_patch.yaml"
Updating kustomize image patch file for default resource
sed -i'' -e 's@image: .*@image: '"localhost:5000/ci-e2e/cluster-api-azure-controller-amd64:20210920145157"'@' ./config/default/manager_image_patch.yaml
/Library/Developer/CommandLineTools/usr/bin/make set-manifest-pull-policy TARGET_RESOURCE="./config/default/manager_pull_policy.yaml"
Updating kustomize pull policy file for default resource
sed -i'' -e 's@imagePullPolicy: .*@imagePullPolicy: '"IfNotPresent"'@' ./config/default/manager_pull_policy.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-md-remediation --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-md-remediation.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-remediation --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-remediation.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption/step1 --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption.yaml
echo "---" >> /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption/step2 --load-restrictor LoadRestrictionsNone >> /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-adoption.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-machine-pool --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-machine-pool.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-node-drain --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-node-drain.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-upgrades --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-upgrades.yaml
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/kustomize-v4.1.3 build /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-scale-in --load-restrictor LoadRestrictionsNone > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/data/infrastructure-azure/v1alpha4/cluster-template-kcp-scale-in.yaml
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh github.com/onsi/ginkgo/ginkgo ginkgo v1.16.4
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/ginkgo*: No such file or directory
go: creating new go.mod: module fake/mod
go: downloading golang.org/x/sys v0.0.0-20210112080510-489259a85091
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added github.com/fsnotify/fsnotify v1.4.9
go get: added github.com/go-task/slim-sprig v0.0.0-20210107165309-348f09dbbbc0
go get: added github.com/nxadm/tail v1.4.8
go get: added github.com/onsi/ginkgo v1.16.4
go get: added golang.org/x/sys v0.0.0-20210112080510-489259a85091
go get: added golang.org/x/tools v0.0.0-20201224043029-2b0845dc783e
go get: added gopkg.in/tomb.v1 v1.0.0-20141024135613-dd632973f1e7
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/config/azure-dev.yaml > /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/config/azure-dev-envsubst.yaml && \
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/ginkgo-v1.16.4 -v -trace -tags=e2e -focus="Workload cluster creation" -skip="Creating a GPU-enabled cluster" -nodes=3 --noColor=false -stream --progress  ./test/e2e -- \
    	-e2e.artifacts-folder="/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/_artifacts" \
    	-e2e.config="/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/config/azure-dev-envsubst.yaml" \
    	-e2e.skip-resource-cleanup=false -e2e.use-existing-cluster=false
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  --stream is deprecated and will be removed in Ginkgo 2.0
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed--stream

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

go: downloading sigs.k8s.io/cluster-api/test v0.4.2
go: downloading k8s.io/kubectl v0.21.3
go: downloading k8s.io/apiserver v0.21.3
go: downloading github.com/containerd/containerd v1.5.2

[2] INFO: skipping test requires pushing container images to external repositoryRunning Suite: capz-e2e
[2] =======================
[2] Random Seed: 1632149706
[1] INFO: skipping test requires pushing container images to external repositoryRunning Suite: capz-e2e
[1] =======================
[1] Random Seed: 1632149706
[1] Parallel test node 1/3.
[1]
[2] Parallel test node 2/3.
[2]
[3] INFO: skipping test requires pushing container images to external repositoryRunning Suite: capz-e2e
[3] =======================
[3] Random Seed: 1632149706
[3] Parallel test node 3/3.
[3]
[1] STEP: Initializing a runtime.Scheme with all the GVK relevant for this test
[1] STEP: Loading the e2e test configuration from "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/config/azure-dev-envsubst.yaml"
[1] STEP: Creating a clusterctl local repository into "/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/_artifacts"
[1] STEP: Reading the ClusterResourceSet manifest /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/addons/calico.yaml
[1] STEP: Setting up the bootstrap cluster
[1] INFO: Creating a kind cluster with name "capz-e2e"
[1] INFO: The kubeconfig file for the kind cluster is /var/folders/4z/09jpfvfj6c19lxl7ch78pzvc0000gn/T/e2e-kind2808326154
[1] INFO: Loading image: "localhost:5000/ci-e2e/cluster-api-azure-controller-amd64:20210920145157"
[1] STEP: Initializing the bootstrap cluster
[1] INFO: clusterctl init --core cluster-api --bootstrap kubeadm --control-plane kubeadm --infrastructure azure
[1] INFO: Waiting for provider controllers to be running
[1] STEP: Waiting for deployment capi-kubeadm-bootstrap-system/capi-kubeadm-bootstrap-controller-manager to be available
[1] INFO: Creating log watcher for controller capi-kubeadm-bootstrap-system/capi-kubeadm-bootstrap-controller-manager, pod capi-kubeadm-bootstrap-controller-manager-575b8d6d84-kqhqb, container manager
[1] STEP: Waiting for deployment capi-kubeadm-control-plane-system/capi-kubeadm-control-plane-controller-manager to be available
[1] INFO: Creating log watcher for controller capi-kubeadm-control-plane-system/capi-kubeadm-control-plane-controller-manager, pod capi-kubeadm-control-plane-controller-manager-6c5fc8747c-nzsvw, container manager
[1] STEP: Waiting for deployment capi-system/capi-controller-manager to be available
[1] INFO: Creating log watcher for controller capi-system/capi-controller-manager, pod capi-controller-manager-7dc56b9799-qdstc, container manager
[1] STEP: Waiting for deployment capz-system/capz-controller-manager to be available
[1] INFO: Creating log watcher for controller capz-system/capz-controller-manager, pod capz-controller-manager-588894f468-tmqxr, container manager
[1] INFO: Creating log watcher for controller capz-system/capz-controller-manager, pod capz-controller-manager-588894f468-tmqxr, container kube-rbac-proxy
[1] Workload cluster creation
[1]   With 3 control-plane nodes and 2 worker nodes
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:184
[1] [BeforeEach] Workload cluster creation
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[1] INFO: "With 3 control-plane nodes and 2 worker nodes" started at Mon, 20 Sep 2021 20:28:39 IST on Ginkgo node 1 of 3
[1] STEP: Creating namespace "capz-e2e-68bcbj" for hosting the cluster
[1] Sep 20 20:28:39.590: INFO: starting to create namespace for hosting the "capz-e2e-68bcbj" test spec
[1] 2021/09/20 20:28:39 failed trying to get namespace (capz-e2e-68bcbj):namespaces "capz-e2e-68bcbj" not found
[3] Workload cluster creation Creating a ipv6 control-plane cluster
[3]   With ipv6 worker node
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:250
[3] [BeforeEach] Workload cluster creation
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[3] INFO: "With ipv6 worker node" started at Mon, 20 Sep 2021 20:28:39 IST on Ginkgo node 3 of 3
[3] STEP: Creating namespace "capz-e2e-6l0t4r" for hosting the cluster
[3] Sep 20 20:28:39.618: INFO: starting to create namespace for hosting the "capz-e2e-6l0t4r" test spec
[1] INFO: Creating namespace capz-e2e-68bcbj
[2] Workload cluster creation Creating a VMSS cluster
[2]   with a single control plane node and an AzureMachinePool with 2 nodes
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:296
[2] [BeforeEach] Workload cluster creation
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[2] INFO: "with a single control plane node and an AzureMachinePool with 2 nodes" started at Mon, 20 Sep 2021 20:28:39 IST on Ginkgo node 2 of 3
[2] STEP: Creating namespace "capz-e2e-ilonue" for hosting the cluster
[2] Sep 20 20:28:39.632: INFO: starting to create namespace for hosting the "capz-e2e-ilonue" test spec
[1] INFO: Creating event watcher for namespace "capz-e2e-68bcbj"
[3] 2021/09/20 20:28:39 failed trying to get namespace (capz-e2e-6l0t4r):namespaces "capz-e2e-6l0t4r" not found
[2] 2021/09/20 20:28:39 failed trying to get namespace (capz-e2e-ilonue):namespaces "capz-e2e-ilonue" not found
[3] INFO: Creating namespace capz-e2e-6l0t4r
[1] [It] With 3 control-plane nodes and 2 worker nodes
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:184
[1] INFO: Cluster name is capz-e2e-68bcbj-ha
[1] INFO: Creating the workload cluster with name "capz-e2e-68bcbj-ha" using the "(default)" template (Kubernetes v1.22.1, 3 control-plane machines, 2 worker machines)
[1] INFO: Getting the cluster template yaml
[1] INFO: clusterctl config cluster capz-e2e-68bcbj-ha --infrastructure (default) --kubernetes-version v1.22.1 --control-plane-machine-count 3 --worker-machine-count 2 --flavor (default)
[2] INFO: Creating namespace capz-e2e-ilonue
[3] INFO: Creating event watcher for namespace "capz-e2e-6l0t4r"
[2] INFO: Creating event watcher for namespace "capz-e2e-ilonue"
[3] [It] With ipv6 worker node
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:250
[3] INFO: Cluster name is capz-e2e-6l0t4r-ipv6
[3] INFO: Creating the workload cluster with name "capz-e2e-6l0t4r-ipv6" using the "ipv6" template (Kubernetes v1.22.1, 3 control-plane machines, 1 worker machines)
[3] INFO: Getting the cluster template yaml
[3] INFO: clusterctl config cluster capz-e2e-6l0t4r-ipv6 --infrastructure (default) --kubernetes-version v1.22.1 --control-plane-machine-count 3 --worker-machine-count 1 --flavor ipv6
[2] [It] with a single control plane node and an AzureMachinePool with 2 nodes
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:296
[2] INFO: Cluster name is capz-e2e-ilonue-vmss
[2] INFO: Creating the workload cluster with name "capz-e2e-ilonue-vmss" using the "machine-pool" template (Kubernetes v1.22.1, 1 control-plane machines, 2 worker machines)
[2] INFO: Getting the cluster template yaml
[2] INFO: clusterctl config cluster capz-e2e-ilonue-vmss --infrastructure (default) --kubernetes-version v1.22.1 --control-plane-machine-count 1 --worker-machine-count 2 --flavor machine-pool
[1] INFO: Applying the cluster template yaml to the cluster
[2] INFO: Applying the cluster template yaml to the cluster
[3] INFO: Applying the cluster template yaml to the cluster
[3] cluster.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6 created
[3] azurecluster.infrastructure.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6 created
[3] kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6-control-plane created
[3] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6-control-plane created
[3] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[3] machinedeployment.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6-md-0 created
[3] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6-md-0 created
[3] kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6-md-0 created
[3] clusterresourceset.addons.cluster.x-k8s.io/capz-e2e-6l0t4r-ipv6-calico created
[3] configmap/cni-capz-e2e-6l0t4r-ipv6-calico created
[3]
[3] INFO: Waiting for the cluster infrastructure to be provisioned
[1] cluster.cluster.x-k8s.io/capz-e2e-68bcbj-ha created
[1] azurecluster.infrastructure.cluster.x-k8s.io/capz-e2e-68bcbj-ha created
[1] kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-e2e-68bcbj-ha-control-plane created
[1] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-68bcbj-ha-control-plane created
[1] machinedeployment.cluster.x-k8s.io/capz-e2e-68bcbj-ha-md-0 created
[1] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-68bcbj-ha-md-0 created
[1] kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-e2e-68bcbj-ha-md-0 created
[1] machinehealthcheck.cluster.x-k8s.io/capz-e2e-68bcbj-ha-mhc-0 created
[1] clusterresourceset.addons.cluster.x-k8s.io/capz-e2e-68bcbj-ha-calico created
[1] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[1] configmap/cni-capz-e2e-68bcbj-ha-calico created
[1]
[1] INFO: Waiting for the cluster infrastructure to be provisioned
[3] STEP: Waiting for cluster to enter the provisioned phase
[1] STEP: Waiting for cluster to enter the provisioned phase
[2] cluster.cluster.x-k8s.io/capz-e2e-ilonue-vmss created
[2] azurecluster.infrastructure.cluster.x-k8s.io/capz-e2e-ilonue-vmss created
[2] kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-e2e-ilonue-vmss-control-plane created
[2] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-ilonue-vmss-control-plane created
[2] machinepool.cluster.x-k8s.io/capz-e2e-ilonue-vmss-mp-0 created
[2] azuremachinepool.infrastructure.cluster.x-k8s.io/capz-e2e-ilonue-vmss-mp-0 created
[2] kubeadmconfig.bootstrap.cluster.x-k8s.io/capz-e2e-ilonue-vmss-mp-0 created
[2] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[2] clusterresourceset.addons.cluster.x-k8s.io/capz-e2e-ilonue-vmss-calico created
[2] configmap/cni-capz-e2e-ilonue-vmss-calico created
[2]
[2] INFO: Waiting for the cluster infrastructure to be provisioned
[2] STEP: Waiting for cluster to enter the provisioned phase
[1] INFO: Waiting for control plane to be initialized
[1] INFO: Waiting for the first control plane machine managed by capz-e2e-68bcbj/capz-e2e-68bcbj-ha-control-plane to be provisioned
[1] STEP: Waiting for one control plane node to exist
[3] INFO: Waiting for control plane to be initialized
[3] INFO: Waiting for the first control plane machine managed by capz-e2e-6l0t4r/capz-e2e-6l0t4r-ipv6-control-plane to be provisioned
[3] STEP: Waiting for one control plane node to exist
[2] INFO: Waiting for control plane to be initialized
[2] INFO: Waiting for the first control plane machine managed by capz-e2e-ilonue/capz-e2e-ilonue-vmss-control-plane to be provisioned
[2] STEP: Waiting for one control plane node to exist
[1] INFO: Waiting for control plane to be ready
[1] INFO: Waiting for the remaining control plane machines managed by capz-e2e-68bcbj/capz-e2e-68bcbj-ha-control-plane to be provisioned
[1] STEP: Waiting for all control plane nodes to exist
[3] INFO: Waiting for control plane to be ready
[3] INFO: Waiting for the remaining control plane machines managed by capz-e2e-6l0t4r/capz-e2e-6l0t4r-ipv6-control-plane to be provisioned
[3] STEP: Waiting for all control plane nodes to exist
[2] INFO: Waiting for control plane to be ready
[2] INFO: Waiting for control plane capz-e2e-ilonue/capz-e2e-ilonue-vmss-control-plane to be ready (implies underlying nodes to be ready as well)
[2] STEP: Waiting for the control plane to be ready
[2] INFO: Waiting for the machine deployments to be provisioned
[2] INFO: Waiting for the machine pools to be provisioned
[2] STEP: Waiting for the machine pool workload nodes to exist
[2] [AfterEach] Workload cluster creation
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:96
[2] STEP: Dumping logs from the "capz-e2e-ilonue-vmss" workload cluster
[2] STEP: Dumping workload cluster capz-e2e-ilonue/capz-e2e-ilonue-vmss logs
[2] Sep 20 20:49:48.530: INFO: INFO: Collecting logs for node capz-e2e-ilonue-vmss-control-plane-b59rt in cluster capz-e2e-ilonue-vmss in namespace capz-e2e-ilonue
[2]
[2] Sep 20 20:50:10.810: INFO: INFO: Collecting boot logs for AzureMachine capz-e2e-ilonue-vmss-control-plane-b59rt
[2]
[2] STEP: Dumping workload cluster capz-e2e-ilonue/capz-e2e-ilonue-vmss kube-system pod logs
[2] STEP: Fetching kube-system pod logs took 1.86536575s
[2] STEP: Dumping workload cluster capz-e2e-ilonue/capz-e2e-ilonue-vmss Azure activity log
[2] STEP: Creating log watcher for controller kube-system/calico-kube-controllers-846b5f484d-qjjts, container calico-kube-controllers
[2] STEP: Creating log watcher for controller kube-system/calico-node-vr8jp, container calico-node
[2] STEP: Creating log watcher for controller kube-system/etcd-capz-e2e-ilonue-vmss-control-plane-b59rt, container etcd
[2] STEP: Creating log watcher for controller kube-system/kube-controller-manager-capz-e2e-ilonue-vmss-control-plane-b59rt, container kube-controller-manager
[2] STEP: Creating log watcher for controller kube-system/coredns-78fcd69978-5r5rq, container coredns
[2] STEP: Creating log watcher for controller kube-system/kube-apiserver-capz-e2e-ilonue-vmss-control-plane-b59rt, container kube-apiserver
[2] STEP: Creating log watcher for controller kube-system/coredns-78fcd69978-w4qzr, container coredns
[2] STEP: Creating log watcher for controller kube-system/kube-proxy-qgnck, container kube-proxy
[2] STEP: Creating log watcher for controller kube-system/kube-scheduler-capz-e2e-ilonue-vmss-control-plane-b59rt, container kube-scheduler
[2] STEP: Fetching activity logs took 920.169413ms
[2] STEP: Dumping all the Cluster API resources in the "capz-e2e-ilonue" namespace
[2] STEP: Deleting all clusters in the capz-e2e-ilonue namespace
[2] STEP: Deleting cluster capz-e2e-ilonue-vmss
[2] INFO: Waiting for the Cluster capz-e2e-ilonue/capz-e2e-ilonue-vmss to be deleted
[2] STEP: Waiting for cluster capz-e2e-ilonue-vmss to be deleted
[2] STEP: Got error while streaming logs for pod kube-system/kube-controller-manager-capz-e2e-ilonue-vmss-control-plane-b59rt, container kube-controller-manager: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/coredns-78fcd69978-w4qzr, container coredns: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/kube-scheduler-capz-e2e-ilonue-vmss-control-plane-b59rt, container kube-scheduler: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/coredns-78fcd69978-5r5rq, container coredns: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/etcd-capz-e2e-ilonue-vmss-control-plane-b59rt, container etcd: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/kube-proxy-qgnck, container kube-proxy: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/calico-node-vr8jp, container calico-node: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/calico-kube-controllers-846b5f484d-qjjts, container calico-kube-controllers: http2: client connection lost
[2] STEP: Got error while streaming logs for pod kube-system/kube-apiserver-capz-e2e-ilonue-vmss-control-plane-b59rt, container kube-apiserver: http2: client connection lost
[1] [AfterEach] Workload cluster creation
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:96
[1] STEP: Dumping logs from the "capz-e2e-68bcbj-ha" workload cluster
[1] STEP: Dumping workload cluster capz-e2e-68bcbj/capz-e2e-68bcbj-ha logs
[1] Sep 20 20:52:48.352: INFO: INFO: Collecting logs for node capz-e2e-68bcbj-ha-control-plane-rx6ns in cluster capz-e2e-68bcbj-ha in namespace capz-e2e-68bcbj
[1]
[1] Sep 20 20:52:56.904: INFO: INFO: Collecting boot logs for AzureMachine capz-e2e-68bcbj-ha-control-plane-rx6ns
[1]
[1] STEP: Redacting sensitive information from logs
[1]
[1] • Failure [1457.710 seconds]
[1] Workload cluster creation
[1] /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:41
[1]   With 3 control-plane nodes and 2 worker nodes [It]
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:184
[1]
[1]   Timed out after 1200.010s.
[1]   Expected
[1]       <int>: 1
[1]   to equal
[1]       <int>: 3
[1]
[1]   /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:108
[1]
[1]   Full Stack Trace
[1]   sigs.k8s.io/cluster-api/test/framework.WaitForKubeadmControlPlaneMachinesToExist({0x2d83600, 0xc000128010}, {{0xc787cc8, 0xc000014000}, 0xc002174000, 0xc001c30900}, {0xc00218c340, 0x2, 0x2})
[1]   	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:108 +0x312
[1]   sigs.k8s.io/cluster-api/test/framework.WaitForControlPlaneAndMachinesReady({0x2d83600, 0xc000128010}, {{0x128c4f80, 0xc000014000}, 0xc002174000, 0xc001c30900}, {0xc00218c340, 0x2, 0x2})
[1]   	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:258 +0x50d
[1]   sigs.k8s.io/cluster-api/test/framework/clusterctl.setDefaults.func2({_, _}, {{0x2dc9a10, 0xc000a54450}, {{0xc000736070, 0x6e}, {0xc0000fca95, 0x7d}, {0xc0000fcb13, 0x43}, ...}, ...}, ...)
[1]   	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:325 +0x97
[1]   sigs.k8s.io/cluster-api/test/framework/clusterctl.ApplyClusterTemplateAndWait({_, _}, {{0x2dc9a10, 0xc000a54450}, {{0xc000736070, 0x6e}, {0xc0000fca95, 0x7d}, {0xc0000fcb13, 0x43}, ...}, ...}, ...)
[1]   	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:295 +0xe8e
[1]   sigs.k8s.io/cluster-api-provider-azure/test/e2e.glob..func1.4()
[1]   	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:186 +0x48e
[1]   github.com/onsi/ginkgo/internal/leafnodes.(*runner).runSync(0x1018a26)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:113 +0xba
[1]   github.com/onsi/ginkgo/internal/leafnodes.(*runner).run(0xc0022395f8)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:64 +0x125
[1]   github.com/onsi/ginkgo/internal/leafnodes.(*ItNode).Run(0xc0005951e0)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/it_node.go:26 +0x7b
[1]   github.com/onsi/ginkgo/internal/spec.(*Spec).runSample(0xc0000d80f0, 0xc00243b9c0, {0x2d49340, 0xc00016e8c0})
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:215 +0x2a9
[1]   github.com/onsi/ginkgo/internal/spec.(*Spec).Run(0xc0000d80f0, {0x2d49340, 0xc00016e8c0})
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:138 +0xe7
[1]   github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpec(0xc0004ca580, 0xc0000d80f0)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:200 +0xe5
[1]   github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpecs(0xc0004ca580)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:170 +0x1a5
[1]   github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).Run(0xc0004ca580)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:66 +0xc5
[1]   github.com/onsi/ginkgo/internal/suite.(*Suite).Run(0xc00019e9a0, {0xca02278, 0xc00050ad00}, {0x2aa2e25, 0x1}, {0xc0003f6300, 0x2, 0x2}, {0x2da3bf8, 0xc00016e8c0}, ...)
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/suite/suite.go:79 +0x4d2
[1]   github.com/onsi/ginkgo.runSpecsWithCustomReporters({0x2d4b0a0, 0xc00050ad00}, {0x2aa2e25, 0x8}, {0xc0003f62e0, 0x2, 0x2abf8a3})
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:238 +0x185
[1]   github.com/onsi/ginkgo.RunSpecsWithDefaultAndCustomReporters({0x2d4b0a0, 0xc00050ad00}, {0x2aa2e25, 0x8}, {0xc0000abf20, 0x1, 0x1})
[1]   	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:221 +0x1be
[1]   sigs.k8s.io/cluster-api-provider-azure/test/e2e.TestE2E(0x1)
[1]   	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/e2e_suite_test.go:256 +0x189
[1]   testing.tRunner(0xc00050ad00, 0x2b93190)
[1]   	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259 +0x102
[1]   created by testing.(*T).Run
[1]   	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1306 +0x35a
[1] ------------------------------
[1] S
[1] ------------------------------
[1] Workload cluster creation Creating a cluster that uses the external cloud provider
[1]   with a 1 control plane nodes and 2 worker nodes
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:400
[1] [BeforeEach] Workload cluster creation
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[1] INFO: "with a 1 control plane nodes and 2 worker nodes" started at Mon, 20 Sep 2021 20:52:57 IST on Ginkgo node 1 of 3
[1] STEP: Creating namespace "capz-e2e-sqbu6h" for hosting the cluster
[1] Sep 20 20:52:57.298: INFO: starting to create namespace for hosting the "capz-e2e-sqbu6h" test spec
[1] 2021/09/20 20:52:57 failed trying to get namespace (capz-e2e-sqbu6h):namespaces "capz-e2e-sqbu6h" not found
[1] INFO: Creating namespace capz-e2e-sqbu6h
[1] INFO: Creating event watcher for namespace "capz-e2e-sqbu6h"
[1] [It] with a 1 control plane nodes and 2 worker nodes
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:400
[1] INFO: Cluster name is capz-e2e-sqbu6h-oot
[1] INFO: Creating the workload cluster with name "capz-e2e-sqbu6h-oot" using the "external-cloud-provider" template (Kubernetes v1.22.1, 1 control-plane machines, 2 worker machines)
[1] INFO: Getting the cluster template yaml
[1] INFO: clusterctl config cluster capz-e2e-sqbu6h-oot --infrastructure (default) --kubernetes-version v1.22.1 --control-plane-machine-count 1 --worker-machine-count 2 --flavor external-cloud-provider
[1] INFO: Applying the cluster template yaml to the cluster
[1] cluster.cluster.x-k8s.io/capz-e2e-sqbu6h-oot created
[1] azurecluster.infrastructure.cluster.x-k8s.io/capz-e2e-sqbu6h-oot created
[1] kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-e2e-sqbu6h-oot-control-plane created
[1] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-sqbu6h-oot-control-plane created
[1] machinedeployment.cluster.x-k8s.io/capz-e2e-sqbu6h-oot-md-0 created
[1] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-sqbu6h-oot-md-0 created
[1] kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-e2e-sqbu6h-oot-md-0 created
[1] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[1] clusterresourceset.addons.cluster.x-k8s.io/crs-ccm created
[1] clusterresourceset.addons.cluster.x-k8s.io/crs-node-manager created
[1] configmap/cloud-controller-manager-addon created
[1] configmap/cloud-node-manager-addon created
[1] clusterresourceset.addons.cluster.x-k8s.io/capz-e2e-sqbu6h-oot-calico created
[1] configmap/cni-capz-e2e-sqbu6h-oot-calico created
[1]
[1] INFO: Waiting for the cluster infrastructure to be provisioned
[1] STEP: Waiting for cluster to enter the provisioned phase
[3] [AfterEach] Workload cluster creation
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:96
[3] STEP: Dumping logs from the "capz-e2e-6l0t4r-ipv6" workload cluster
[3] STEP: Dumping workload cluster capz-e2e-6l0t4r/capz-e2e-6l0t4r-ipv6 logs
[3] Sep 20 20:53:08.310: INFO: INFO: Collecting logs for node capz-e2e-6l0t4r-ipv6-control-plane-89427 in cluster capz-e2e-6l0t4r-ipv6 in namespace capz-e2e-6l0t4r
[3]
[3] Sep 20 20:53:15.911: INFO: INFO: Collecting boot logs for AzureMachine capz-e2e-6l0t4r-ipv6-control-plane-89427
[3]
[3] STEP: Redacting sensitive information from logs
[3]
[3] • Failure [1476.330 seconds]
[3] Workload cluster creation
[3] /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:41
[3]   Creating a ipv6 control-plane cluster
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:249
[3]     With ipv6 worker node [It]
[3]     /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:250
[3]
[3]     Timed out after 1200.004s.
[3]     Expected
[3]         <int>: 1
[3]     to equal
[3]         <int>: 3
[3]
[3]     /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:108
[3]
[3]     Full Stack Trace
[3]     sigs.k8s.io/cluster-api/test/framework.WaitForKubeadmControlPlaneMachinesToExist({0x2d83600, 0xc00019e010}, {{0x2cb4c2f8, 0xc00038a230}, 0xc000148a80, 0xc000afac00}, {0xc000290080, 0x2, 0x2})
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:108 +0x312
[3]     sigs.k8s.io/cluster-api/test/framework.WaitForControlPlaneAndMachinesReady({0x2d83600, 0xc00019e010}, {{0x2cb8b8f8, 0xc00038a230}, 0xc000148a80, 0xc000afac00}, {0xc000290080, 0x2, 0x2})
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:258 +0x50d
[3]     sigs.k8s.io/cluster-api/test/framework/clusterctl.setDefaults.func2({_, _}, {{0x2dc9a10, 0xc0009d4a70}, {{0xc000214230, 0x6e}, {0xc00005e755, 0x7d}, {0xc00005e7d3, 0x43}, ...}, ...}, ...)
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:325 +0x97
[3]     sigs.k8s.io/cluster-api/test/framework/clusterctl.ApplyClusterTemplateAndWait({_, _}, {{0x2dc9a10, 0xc0009d4a70}, {{0xc000214230, 0x6e}, {0xc00005e755, 0x7d}, {0xc00005e7d3, 0x43}, ...}, ...}, ...)
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:295 +0xe8e
[3]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.glob..func1.5.1()
[3]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:252 +0x488
[3]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).runSync(0x1018a26)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:113 +0xba
[3]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).run(0xc000af35f8)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:64 +0x125
[3]     github.com/onsi/ginkgo/internal/leafnodes.(*ItNode).Run(0xc0005280d0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/it_node.go:26 +0x7b
[3]     github.com/onsi/ginkgo/internal/spec.(*Spec).runSample(0xc0000d41e0, 0xc0000319c0, {0x2d49340, 0xc0001e68c0})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:215 +0x2a9
[3]     github.com/onsi/ginkgo/internal/spec.(*Spec).Run(0xc0000d41e0, {0x2d49340, 0xc0001e68c0})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:138 +0xe7
[3]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpec(0xc0004e86e0, 0xc0000d41e0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:200 +0xe5
[3]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpecs(0xc0004e86e0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:170 +0x1a5
[3]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).Run(0xc0004e86e0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:66 +0xc5
[3]     github.com/onsi/ginkgo/internal/suite.(*Suite).Run(0xc000216af0, {0x2c885ca0, 0xc0005029c0}, {0x2aa2e25, 0x1}, {0xc00090c2e0, 0x2, 0x2}, {0x2da3bf8, 0xc0001e68c0}, ...)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/suite/suite.go:79 +0x4d2
[3]     github.com/onsi/ginkgo.runSpecsWithCustomReporters({0x2d4b0a0, 0xc0005029c0}, {0x2aa2e25, 0x8}, {0xc00090c2c0, 0x2, 0x2abf8a3})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:238 +0x185
[3]     github.com/onsi/ginkgo.RunSpecsWithDefaultAndCustomReporters({0x2d4b0a0, 0xc0005029c0}, {0x2aa2e25, 0x8}, {0xc0000a9f20, 0x1, 0x1})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:221 +0x1be
[3]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.TestE2E(0x1)
[3]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/e2e_suite_test.go:256 +0x189
[3]     testing.tRunner(0xc0005029c0, 0x2b93190)
[3]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259 +0x102
[3]     created by testing.(*T).Run
[3]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1306 +0x35a
[3] ------------------------------
[3] Workload cluster creation Creating an AKS cluster
[3]   with a single control plane node and 1 node
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:435
[3] [BeforeEach] Workload cluster creation
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[3] INFO: "with a single control plane node and 1 node" started at Mon, 20 Sep 2021 20:53:15 IST on Ginkgo node 3 of 3
[3] STEP: Creating namespace "capz-e2e-1crvx1" for hosting the cluster
[3] Sep 20 20:53:15.946: INFO: starting to create namespace for hosting the "capz-e2e-1crvx1" test spec
[3] 2021/09/20 20:53:15 failed trying to get namespace (capz-e2e-1crvx1):namespaces "capz-e2e-1crvx1" not found
[3] INFO: Creating namespace capz-e2e-1crvx1
[3] INFO: Creating event watcher for namespace "capz-e2e-1crvx1"
[3] [It] with a single control plane node and 1 node
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:435
[3] INFO: Cluster name is capz-e2e-1crvx1-aks
[3] INFO: Creating the workload cluster with name "capz-e2e-1crvx1-aks" using the "aks-multi-tenancy" template (Kubernetes v1.19.13, 1 control-plane machines, 1 worker machines)
[3] INFO: Getting the cluster template yaml
[3] INFO: clusterctl config cluster capz-e2e-1crvx1-aks --infrastructure (default) --kubernetes-version v1.19.13 --control-plane-machine-count 1 --worker-machine-count 1 --flavor aks-multi-tenancy
[3] INFO: Applying the cluster template yaml to the cluster
[3] cluster.cluster.x-k8s.io/capz-e2e-1crvx1-aks created
[3] azuremanagedcontrolplane.infrastructure.cluster.x-k8s.io/capz-e2e-1crvx1-aks created
[3] azuremanagedcluster.infrastructure.cluster.x-k8s.io/capz-e2e-1crvx1-aks created
[3] machinepool.cluster.x-k8s.io/agentpool0 created
[3] azuremanagedmachinepool.infrastructure.cluster.x-k8s.io/agentpool0 created
[3] machinepool.cluster.x-k8s.io/agentpool1 created
[3] azuremanagedmachinepool.infrastructure.cluster.x-k8s.io/agentpool1 created
[3] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[3]
[3] INFO: Waiting for the cluster infrastructure to be provisioned
[3] STEP: Waiting for cluster to enter the provisioned phase
[1] INFO: Waiting for control plane to be initialized
[1] INFO: Waiting for the first control plane machine managed by capz-e2e-sqbu6h/capz-e2e-sqbu6h-oot-control-plane to be provisioned
[1] STEP: Waiting for one control plane node to exist
[1] INFO: Waiting for control plane to be ready
[1] INFO: Waiting for control plane capz-e2e-sqbu6h/capz-e2e-sqbu6h-oot-control-plane to be ready (implies underlying nodes to be ready as well)
[1] STEP: Waiting for the control plane to be ready
[1] INFO: Waiting for the machine deployments to be provisioned
[1] STEP: Waiting for the workload nodes to exist
[2] STEP: Deleting namespace used for hosting the "create-workload-cluster" test spec
[2] INFO: Deleting namespace capz-e2e-ilonue
[2] STEP: Checking if any resources are left over in Azure for spec "create-workload-cluster"
[2] STEP: Redacting sensitive information from logs
[2] INFO: "with a single control plane node and an AzureMachinePool with 2 nodes" ran for 31m20s on Ginkgo node 2 of 3
[2]
[2] • Failure [1880.328 seconds]
[2] Workload cluster creation
[2] /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:41
[2]   Creating a VMSS cluster
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:295
[2]     with a single control plane node and an AzureMachinePool with 2 nodes [It]
[2]     /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:296
[2]
[2]     Timed out after 900.009s.
[2]     Expected
[2]         <int>: 0
[2]     to equal
[2]         <int>: 2
[2]
[2]     /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinepool_helpers.go:85
[2]
[2]     Full Stack Trace
[2]     sigs.k8s.io/cluster-api/test/framework.WaitForMachinePoolNodesToExist({0x2d83600, 0xc0000520e0}, {{0x5ba4768, 0xc0002c2620}, 0xc0005bc000}, {0x0, 0x0, 0x0})
[2]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinepool_helpers.go:85 +0x3e6
[2]     sigs.k8s.io/cluster-api/test/framework.DiscoveryAndWaitForMachinePools({0x2d83600, 0xc0000520e0}, {{0x5ba4768, 0xc0002c2620}, {0x5ea4a90, 0xc0002c2690}, 0xc00069a540}, {0x0, 0x0, 0x0})
[2]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinepool_helpers.go:107 +0x385
[2]     sigs.k8s.io/cluster-api/test/framework/clusterctl.ApplyClusterTemplateAndWait({_, _}, {{0x2dc9a10, 0xc0006d6750}, {{0xc0006de070, 0x6e}, {0xc00005e755, 0x7d}, {0xc00005e7d3, 0x43}, ...}, ...}, ...)
[2]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:304 +0x110a
[2]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.glob..func1.6.1()
[2]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:298 +0x488
[2]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).runSync(0x100e0de)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:113 +0xba
[2]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).run(0xc000b075f8)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:64 +0x125
[2]     github.com/onsi/ginkgo/internal/leafnodes.(*ItNode).Run(0xc000b02410)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/it_node.go:26 +0x7b
[2]     github.com/onsi/ginkgo/internal/spec.(*Spec).runSample(0xc00052e2d0, 0xc00096b9c0, {0x2d49340, 0xc0000cc900})
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:215 +0x2a9
[2]     github.com/onsi/ginkgo/internal/spec.(*Spec).Run(0xc00052e2d0, {0x2d49340, 0xc0000cc900})
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:138 +0xe7
[2]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpec(0xc0003ce580, 0xc00052e2d0)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:200 +0xe5
[2]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpecs(0xc0003ce580)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:170 +0x1a5
[2]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).Run(0xc0003ce580)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:66 +0xc5
[2]     github.com/onsi/ginkgo/internal/suite.(*Suite).Run(0xc0002369a0, {0x2c981370, 0xc0005829c0}, {0x2aa2e25, 0x1}, {0xc000536780, 0x2, 0x2}, {0x2da3bf8, 0xc0000cc900}, ...)
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/suite/suite.go:79 +0x4d2
[2]     github.com/onsi/ginkgo.runSpecsWithCustomReporters({0x2d4b0a0, 0xc0005829c0}, {0x2aa2e25, 0x8}, {0xc000536760, 0x2, 0x2abf8a3})
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:238 +0x185
[2]     github.com/onsi/ginkgo.RunSpecsWithDefaultAndCustomReporters({0x2d4b0a0, 0xc0005829c0}, {0x2aa2e25, 0x8}, {0xc0001a4f20, 0x1, 0x1})
[2]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:221 +0x1be
[2]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.TestE2E(0x1)
[2]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/e2e_suite_test.go:256 +0x189
[2]     testing.tRunner(0xc0005829c0, 0x2b93190)
[2]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259 +0x102
[2]     created by testing.(*T).Run
[2]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1306 +0x35a
[2] ------------------------------
[2] Workload cluster creation Creating a Windows Enabled cluster
[2]   With 3 control-plane nodes and 1 Linux worker node and 1 Windows worker node
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:477
[2] [BeforeEach] Workload cluster creation
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[2] INFO: "With 3 control-plane nodes and 1 Linux worker node and 1 Windows worker node" started at Mon, 20 Sep 2021 20:59:59 IST on Ginkgo node 2 of 3
[2] STEP: Creating namespace "capz-e2e-lz2nnu" for hosting the cluster
[2] Sep 20 20:59:59.987: INFO: starting to create namespace for hosting the "capz-e2e-lz2nnu" test spec
[2] 2021/09/20 20:59:59 failed trying to get namespace (capz-e2e-lz2nnu):namespaces "capz-e2e-lz2nnu" not found
[2] INFO: Creating namespace capz-e2e-lz2nnu
[2] INFO: Creating event watcher for namespace "capz-e2e-lz2nnu"
[2] [It] With 3 control-plane nodes and 1 Linux worker node and 1 Windows worker node
[2]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:477
[2] INFO: Cluster name is capz-e2e-lz2nnu-win-ha
[2] INFO: Creating the workload cluster with name "capz-e2e-lz2nnu-win-ha" using the "windows" template (Kubernetes v1.22.1, 3 control-plane machines, 1 worker machines)
[2] INFO: Getting the cluster template yaml
[2] INFO: clusterctl config cluster capz-e2e-lz2nnu-win-ha --infrastructure (default) --kubernetes-version v1.22.1 --control-plane-machine-count 3 --worker-machine-count 1 --flavor windows
[2] INFO: Applying the cluster template yaml to the cluster
[2] cluster.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha created
[2] azurecluster.infrastructure.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha created
[2] kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-control-plane created
[2] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-control-plane created
[2] machinedeployment.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-md-0 created
[2] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-md-0 created
[2] kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-md-0 created
[2] machinedeployment.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-md-win created
[2] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-md-win created
[2] kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-md-win created
[2] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[2] clusterresourceset.addons.cluster.x-k8s.io/capz-e2e-lz2nnu-win-ha-flannel created
[2] configmap/cni-capz-e2e-lz2nnu-win-ha-flannel created
[2]
[2] INFO: Waiting for the cluster infrastructure to be provisioned
[2] STEP: Waiting for cluster to enter the provisioned phase
[2] INFO: Waiting for control plane to be initialized
[2] INFO: Waiting for the first control plane machine managed by capz-e2e-lz2nnu/capz-e2e-lz2nnu-win-ha-control-plane to be provisioned
[2] STEP: Waiting for one control plane node to exist
[1] [AfterEach] Workload cluster creation
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:96
[1] STEP: Dumping logs from the "capz-e2e-sqbu6h-oot" workload cluster
[1] STEP: Dumping workload cluster capz-e2e-sqbu6h/capz-e2e-sqbu6h-oot logs
[1] Sep 20 21:12:20.905: INFO: INFO: Collecting logs for node capz-e2e-sqbu6h-oot-control-plane-xd2gv in cluster capz-e2e-sqbu6h-oot in namespace capz-e2e-sqbu6h
[1]
[1] Sep 20 21:12:43.747: INFO: INFO: Collecting boot logs for AzureMachine capz-e2e-sqbu6h-oot-control-plane-xd2gv
[1]
[1] Sep 20 21:12:46.047: INFO: INFO: Collecting logs for node capz-e2e-sqbu6h-oot-md-0-zfrrp in cluster capz-e2e-sqbu6h-oot in namespace capz-e2e-sqbu6h
[1]
[1] Sep 20 21:12:52.196: INFO: INFO: Collecting boot logs for AzureMachine capz-e2e-sqbu6h-oot-md-0-zfrrp
[1]
[1] STEP: Redacting sensitive information from logs
[1]
[1] • Failure [1194.899 seconds]
[1] Workload cluster creation
[1] /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:41
[1]   Creating a cluster that uses the external cloud provider
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:399
[1]     with a 1 control plane nodes and 2 worker nodes [It]
[1]     /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:400
[1]
[1]     Timed out after 900.007s.
[1]     Expected
[1]         <int>: 0
[1]     to equal
[1]         <int>: 2
[1]
[1]     /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinedeployment_helpers.go:121
[1]
[1]     Full Stack Trace
[1]     sigs.k8s.io/cluster-api/test/framework.WaitForMachineDeploymentNodesToExist({0x2d83600, 0xc000128010}, {{0xc787cc8, 0xc0002b6af0}, 0xc00147e000, 0xc00087e580}, {0x0, 0x0, 0x0})
[1]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinedeployment_helpers.go:121 +0x426
[1]     sigs.k8s.io/cluster-api/test/framework.DiscoveryAndWaitForMachineDeployments({0x2d83600, 0xc000128010}, {{0xc787cc8, 0xc0002b6af0}, 0xc00147e000}, {0x0, 0x0, 0x0})
[1]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinedeployment_helpers.go:142 +0x3bd
[1]     sigs.k8s.io/cluster-api/test/framework/clusterctl.ApplyClusterTemplateAndWait({_, _}, {{0x2dc9a10, 0xc000a54450}, {{0xc0013da7e0, 0x6e}, {0xc0000fca95, 0x7d}, {0xc0000fcb13, 0x43}, ...}, ...}, ...)
[1]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:298 +0xf52
[1]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.glob..func1.8.1()
[1]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:402 +0x488
[1]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).runSync(0xc0002f92f8)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:113 +0xba
[1]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).run(0xc0002f95f8)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:64 +0x125
[1]     github.com/onsi/ginkgo/internal/leafnodes.(*ItNode).Run(0xc000d181a0)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/it_node.go:26 +0x7b
[1]     github.com/onsi/ginkgo/internal/spec.(*Spec).runSample(0xc0000d84b0, 0xc0002f99c0, {0x2d49340, 0xc00016e8c0})
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:215 +0x2a9
[1]     github.com/onsi/ginkgo/internal/spec.(*Spec).Run(0xc0000d84b0, {0x2d49340, 0xc00016e8c0})
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:138 +0xe7
[1]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpec(0xc0004ca580, 0xc0000d84b0)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:200 +0xe5
[1]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpecs(0xc0004ca580)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:170 +0x1a5
[1]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).Run(0xc0004ca580)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:66 +0xc5
[1]     github.com/onsi/ginkgo/internal/suite.(*Suite).Run(0xc00019e9a0, {0xca02278, 0xc00050ad00}, {0x2aa2e25, 0x1}, {0xc0003f6300, 0x2, 0x2}, {0x2da3bf8, 0xc00016e8c0}, ...)
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/suite/suite.go:79 +0x4d2
[1]     github.com/onsi/ginkgo.runSpecsWithCustomReporters({0x2d4b0a0, 0xc00050ad00}, {0x2aa2e25, 0x8}, {0xc0003f62e0, 0x2, 0x2abf8a3})
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:238 +0x185
[1]     github.com/onsi/ginkgo.RunSpecsWithDefaultAndCustomReporters({0x2d4b0a0, 0xc00050ad00}, {0x2aa2e25, 0x8}, {0xc0000abf20, 0x1, 0x1})
[1]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:221 +0x1be
[1]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.TestE2E(0x1)
[1]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/e2e_suite_test.go:256 +0x189
[1]     testing.tRunner(0xc00050ad00, 0x2b93190)
[1]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259 +0x102
[1]     created by testing.(*T).Run
[1]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1306 +0x35a
[1] ------------------------------
[1] Workload cluster creation Creating a Windows enabled VMSS cluster
[1]   with a single control plane node and an Linux AzureMachinePool with 1 nodes and Windows AzureMachinePool with 1 node
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:524
[1] [BeforeEach] Workload cluster creation
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:54
[1] INFO: "with a single control plane node and an Linux AzureMachinePool with 1 nodes and Windows AzureMachinePool with 1 node" started at Mon, 20 Sep 2021 21:12:52 IST on Ginkgo node 1 of 3
[1] STEP: Creating namespace "capz-e2e-4pqcgt" for hosting the cluster
[1] Sep 20 21:12:52.236: INFO: starting to create namespace for hosting the "capz-e2e-4pqcgt" test spec
[1] 2021/09/20 21:12:52 failed trying to get namespace (capz-e2e-4pqcgt):namespaces "capz-e2e-4pqcgt" not found
[1] INFO: Creating namespace capz-e2e-4pqcgt
[1] INFO: Creating event watcher for namespace "capz-e2e-4pqcgt"
[1] [It] with a single control plane node and an Linux AzureMachinePool with 1 nodes and Windows AzureMachinePool with 1 node
[1]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:524
[1] INFO: Cluster name is capz-e2e-4pqcgt-win-vmss
[1] INFO: Creating the workload cluster with name "capz-e2e-4pqcgt-win-vmss" using the "machine-pool-windows" template (Kubernetes v1.22.1, 1 control-plane machines, 1 worker machines)
[1] INFO: Getting the cluster template yaml
[1] INFO: clusterctl config cluster capz-e2e-4pqcgt-win-vmss --infrastructure (default) --kubernetes-version v1.22.1 --control-plane-machine-count 1 --worker-machine-count 1 --flavor machine-pool-windows
[1] INFO: Applying the cluster template yaml to the cluster
[1] cluster.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss created
[1] azurecluster.infrastructure.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss created
[1] kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-control-plane created
[1] azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-control-plane created
[1] azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity created
[1] machinepool.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-mp-0 created
[1] azuremachinepool.infrastructure.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-mp-0 created
[1] kubeadmconfig.bootstrap.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-mp-0 created
[1] machinepool.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-mp-win created
[1] azuremachinepool.infrastructure.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-mp-win created
[1] kubeadmconfig.bootstrap.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-mp-win created
[1] clusterresourceset.addons.cluster.x-k8s.io/capz-e2e-4pqcgt-win-vmss-flannel created
[1] configmap/cni-capz-e2e-4pqcgt-win-vmss-flannel created
[1]
[1] INFO: Waiting for the cluster infrastructure to be provisioned
[1] STEP: Waiting for cluster to enter the provisioned phase
[3] [AfterEach] Workload cluster creation
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:96
[3] STEP: Unable to dump workload cluster logs as the cluster is nil
[3] STEP: Dumping all the Cluster API resources in the "capz-e2e-1crvx1" namespace
[3] STEP: Deleting all clusters in the capz-e2e-1crvx1 namespace
[3] STEP: Deleting cluster capz-e2e-1crvx1-aks
[3] INFO: Waiting for the Cluster capz-e2e-1crvx1/capz-e2e-1crvx1-aks to be deleted
[3] STEP: Waiting for cluster capz-e2e-1crvx1-aks to be deleted
[1] INFO: Waiting for control plane to be initialized
[1] INFO: Waiting for the first control plane machine managed by capz-e2e-4pqcgt/capz-e2e-4pqcgt-win-vmss-control-plane to be provisioned
[1] STEP: Waiting for one control plane node to exist
[3] STEP: Deleting namespace used for hosting the "create-workload-cluster" test spec
[3] INFO: Deleting namespace capz-e2e-1crvx1
[3] STEP: Checking if any resources are left over in Azure for spec "create-workload-cluster"
[3] STEP: Redacting sensitive information from logs
[3] INFO: "with a single control plane node and 1 node" ran for 23m53s on Ginkgo node 3 of 3
[3]
[3] • Failure [1433.447 seconds]
[3] Workload cluster creation
[3] /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:41
[3]   Creating an AKS cluster
[3]   /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:434
[3]     with a single control plane node and 1 node [It]
[3]     /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:435
[3]
[3]     Timed out after 1200.001s.
[3]     Expected
[3]         <string>: Provisioning
[3]     to equal
[3]         <string>: Provisioned
[3]
[3]     /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/cluster_helpers.go:134
[3]
[3]     Full Stack Trace
[3]     sigs.k8s.io/cluster-api/test/framework.WaitForClusterToProvision({0x2d83600, 0xc00019e010}, {{0x2ccc4310, 0xc0002504d0}, 0xc00067e700}, {0xc000a4d280, 0x2, 0x2})
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/cluster_helpers.go:134 +0x17b
[3]     sigs.k8s.io/cluster-api/test/framework.DiscoveryAndWaitForCluster({0x2d83600, 0xc00019e010}, {{0x2ccc4310, 0xc0002504d0}, {0xc0005b0060, 0xf}, {0xc0005620a8, 0x13}}, {0xc000a4d280, 0x2, ...})
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/cluster_helpers.go:189 +0x4c6
[3]     sigs.k8s.io/cluster-api/test/framework/clusterctl.ApplyClusterTemplateAndWait({_, _}, {{0x2dc9a10, 0xc0009d4a70}, {{0xc00006a5b0, 0x6e}, {0xc00005e755, 0x7d}, {0xc00005e7d3, 0x43}, ...}, ...}, ...)
[3]     	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/clusterctl/clusterctl_helpers.go:275 +0xab5
[3]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.glob..func1.9.1()
[3]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/azure_test.go:440 +0x533
[3]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).runSync(0x1018a26)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:113 +0xba
[3]     github.com/onsi/ginkgo/internal/leafnodes.(*runner).run(0xc000cf15f8)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:64 +0x125
[3]     github.com/onsi/ginkgo/internal/leafnodes.(*ItNode).Run(0xc0004a8000)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/it_node.go:26 +0x7b
[3]     github.com/onsi/ginkgo/internal/spec.(*Spec).runSample(0xc0000d45a0, 0xc000cf19c0, {0x2d49340, 0xc0001e68c0})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:215 +0x2a9
[3]     github.com/onsi/ginkgo/internal/spec.(*Spec).Run(0xc0000d45a0, {0x2d49340, 0xc0001e68c0})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/spec/spec.go:138 +0xe7
[3]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpec(0xc0004e86e0, 0xc0000d45a0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:200 +0xe5
[3]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).runSpecs(0xc0004e86e0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:170 +0x1a5
[3]     github.com/onsi/ginkgo/internal/specrunner.(*SpecRunner).Run(0xc0004e86e0)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/specrunner/spec_runner.go:66 +0xc5
[3]     github.com/onsi/ginkgo/internal/suite.(*Suite).Run(0xc000216af0, {0x2c885ca0, 0xc0005029c0}, {0x2aa2e25, 0x1}, {0xc00090c2e0, 0x2, 0x2}, {0x2da3bf8, 0xc0001e68c0}, ...)
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/suite/suite.go:79 +0x4d2
[3]     github.com/onsi/ginkgo.runSpecsWithCustomReporters({0x2d4b0a0, 0xc0005029c0}, {0x2aa2e25, 0x8}, {0xc00090c2c0, 0x2, 0x2abf8a3})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:238 +0x185
[3]     github.com/onsi/ginkgo.RunSpecsWithDefaultAndCustomReporters({0x2d4b0a0, 0xc0005029c0}, {0x2aa2e25, 0x8}, {0xc0000a9f20, 0x1, 0x1})
[3]     	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/ginkgo_dsl.go:221 +0x1be
[3]     sigs.k8s.io/cluster-api-provider-azure/test/e2e.TestE2E(0x1)
[3]     	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/e2e_suite_test.go:256 +0x189
[3]     testing.tRunner(0xc0005029c0, 0x2b93190)
[3]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1259 +0x102
[3]     created by testing.(*T).Run
[3]     	/usr/local/Cellar/go/1.17/libexec/src/testing/testing.go:1306 +0x35a
[3] ------------------------------
[3] SSSSSSSSSSSS
[3] JUnit report was created: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/_artifacts/junit.e2e_suite.3.xml
[3]
[3]
[3] Summarizing 2 Failures:
[3]
[3] [Fail] Workload cluster creation Creating a ipv6 control-plane cluster [It] With ipv6 worker node
[3] /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:108
[3]
[3] [Fail] Workload cluster creation Creating an AKS cluster [It] with a single control plane node and 1 node
[3] /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/cluster_helpers.go:134
[3]
[3] Ran 2 of 14 Specs in 3102.421 seconds
[3] FAIL! -- 0 Passed | 2 Failed | 0 Pending | 12 Skipped
[3] You're using deprecated Ginkgo functionality:
[3] =============================================
[3] Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
[3] To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
[3] To comment, chime in at https://github.com/onsi/ginkgo/issues/711
[3]
[3]   You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.
[3]
[3]   If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
[3]   Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters
[3]   Measure is deprecated and will be removed in Ginkgo V2.  Please migrate to gomega/gmeasure.
[3]   Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-measure
[3]     /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/test/e2e/conformance_test.go:100
[3]
[3] To silence deprecations that can be silenced set the following environment variable:
[3]   ACK_GINKGO_DEPRECATIONS=1.16.4
[3]
[3] --- FAIL: TestE2E (3102.44s)
[3] FAIL



^C[1]
[1] ---------------------------------------------------------
[1] Received interrupt.  Running AfterSuite...
[1] ^C again to terminate immediately
[2]
[2] ---------------------------------------------------------
[2] Received interrupt.  Running AfterSuite...
[2] ^C again to terminate immediately
[2]
[2] JUnit report was created: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/_artifacts/junit.e2e_suite.2.xml
[2]
[2]
[2] Summarizing 1 Failure:
[2]
[2] [Fail] Workload cluster creation Creating a VMSS cluster [It] with a single control plane node and an AzureMachinePool with 2 nodes
[2] /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinepool_helpers.go:85
[2]
[2] Ran 2 of 2 Specs in 3234.237 seconds
[2] FAIL! -- 1 Passed | 1 Failed | 0 Pending | 0 Skipped
[1] STEP: Tearing down the management cluster
[1] W0920 21:19:22.022987   32630 reflector.go:436] pkg/mod/k8s.io/client-go@v0.21.3/tools/cache/reflector.go:167: watch of *v1.Event ended with: very short watch: pkg/mod/k8s.io/client-go@v0.21.3/tools/cache/reflector.go:167: Unexpected watch close - watch lasted less than a second and no items received
[1]
[1] JUnit report was created: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/_artifacts/junit.e2e_suite.1.xml
[1]
[1]
[1] Summarizing 2 Failures:
[1]
[1] [Fail] Workload cluster creation [It] With 3 control-plane nodes and 2 worker nodes
[1] /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/controlplane_helpers.go:108
[1]
[1] [Fail] Workload cluster creation Creating a cluster that uses the external cloud provider [It] with a 1 control plane nodes and 2 worker nodes
[1] /Users/karuppiahn/go/pkg/mod/sigs.k8s.io/cluster-api/test@v0.4.2/framework/machinedeployment_helpers.go:121
[1]
[1] Ran 3 of 4 Specs in 3235.876 seconds
[1] FAIL! -- 1 Passed | 2 Failed | 0 Pending | 1 Skipped

Ginkgo ran 1 suite in 54m16.882870455s
Test Suite Failed
make[1]: *** [test-e2e-run] Error 1
make: *** [test-e2e-local] Interrupt: 2
================ REDACTING LOGS ================
All sensitive variables are redacted

```

---

Okay, so the code is in here

https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/47caf96183f7d3bd1e4dda5944a06dae10318bc7/azure/services/groups/spec.go#L50-L66

Currently, if the resource group already exists, then it's not updated

```go
if existing != nil {
    // rg already exists, nothing to update.
    return nil, nil
}
```

But if additonal tags are updated, then it has to be updated. For example, there's an additional tags field in the Azure Cluster

```bash
$ k explain azurecluster.spec.additionalTags
KIND:     AzureCluster
VERSION:  infrastructure.cluster.x-k8s.io/v1alpha4

FIELD:    additionalTags <map[string]string>

DESCRIPTION:
     AdditionalTags is an optional set of tags to add to Azure resources managed
     by the Azure provider, in addition to the ones added by default.
```

Group is Resource Group I think. More like `resources.Group` https://pkg.go.dev/github.com/Azure/azure-sdk-for-go@v55.8.0+incompatible/services/resources/mgmt/2019-05-01/resources?utm_source=gopls#Group

The Group spec has `AdditionalTags` field

```go
// GroupSpec defines the specification for a Resource Group.
type GroupSpec struct {
	Name           string
	Location       string
	ClusterName    string
	AdditionalTags infrav1.Tags
}
```

Which is filled in from the AzureCluster

```go
// GroupSpec returns the resource group spec.
func (s *ClusterScope) GroupSpec() azure.ResourceSpecGetter {
	return &groups.GroupSpec{
		Name:           s.ResourceGroup(),
		Location:       s.Location(),
		ClusterName:    s.ClusterName(),
		AdditionalTags: s.AdditionalTags(),
	}
}
```

```go
// AdditionalTags returns AdditionalTags from the scope's AzureCluster.
func (s *ClusterScope) AdditionalTags() infrav1.Tags {
	tags := make(infrav1.Tags)
	if s.AzureCluster.Spec.AdditionalTags != nil {
		tags = s.AzureCluster.Spec.AdditionalTags.DeepCopy()
	}
	return tags
}
```

There are also some more references to the `AdditionalTags` field, some in tests, one in a thing called managed control plane. But I think I can put that off for now

Now, we need to add a test for the situation where - An Azure cluster is created with some or no additonal tags, this way resource group is created with some or no additional tags. Later we can update the Azure cluster with some extra additonal tags and that should be updated in the resource group too! I'm wondering where to add this test. Also, I'm guessing this will be an E2E test, but this is too heavy, hmm. With E2E, it will take a lot of time, with unit tests / integration tests with mocks, maybe a little faster. Gotta check if that kind of test exists here, for similar tag update feature, hmm. I could check for Azure machine, it also seems to have some tags, and can also inherit tags from Azure cluster I think

Also, there's some `azure/services/tags/tags.go` which I was wondering what it is for

I think azure machine tags - don't get updated, at least I'm not able to see any update tags code using additonal tags

`azure/services/virtualmachines/virtualmachines.go` > `Reconcile` method does have mention of tags but only for create. For update, there's no mention of tags

```go
case err == nil:
// VM already exists, update the spec and skip creation.
s.Scope.SetProviderID(azure.ProviderIDPrefix + existingVM.ID)
s.Scope.SetAnnotation("cluster-api-provider-azure", "true")
s.Scope.SetAddresses(existingVM.Addresses)
s.Scope.SetVMState(existingVM.State)
s.Scope.UpdateStatus()
```

I guess I just gotta look for another resource, which has tags and updates tags and has test code - to see what test it has

I think `azure/services/groups/spec.go` > `Parameters` method is used by - `azure/services/groups/client.go` > `resourceGroupParams` method which in turn is used by `azure/services/groups/client.go` > `CreateOrUpdateAsync` which in turn is used by `azure/services/async/async.go` > `CreateResource` which seems like a very generic function, for now it's used by `azure/services/groups/groups.go` > `Reconcile` method which in turn seems to be used by two files -

`exp/controllers/azuremanagedcontrolplane_reconciler.go` > `Reconcile` method at

```go
if err := r.groupsSvc.Reconcile(ctx); err != nil {
    return errors.Wrap(err, "failed to reconcile managed cluster resource group")
}
```

and

`controllers/azurecluster_reconciler.go` > `Reconcile` method at

```go
if err := s.groupsSvc.Reconcile(ctx); err != nil {
    return errors.Wrap(err, "failed to reconcile resource group")
}
```

but the `groupsSvc` fields are all of type `azure.Reconciler` which make it hard to find from where the implementation comes, but with the name and error messages it's clear that the resource group implementation is injected, maybe for tests etc mock might be injected

`controllers/azurecluster_reconciler.go` > `newAzureClusterService` shows how it's created -

```go
groupsSvc:        groups.New(scope),
```

In tests, it's below in `controllers/azurecluster_reconciler_test.go` > `TestAzureClusterReconcilerDelete`

```go
groupsSvc:        groupsMock,
```

---

Regarding the managed control plane, looks like there's azure managed clusters and related CRDs

```bash
$ k get crd | rg azure | rg managed
azuremanagedclusters.infrastructure.cluster.x-k8s.io         2021-09-21T05:22:20Z
azuremanagedcontrolplanes.infrastructure.cluster.x-k8s.io    2021-09-21T05:22:20Z
azuremanagedmachinepools.infrastructure.cluster.x-k8s.io     2021-09-21T05:22:20Z
```

I think it's the managed service from azure, which can be managed using CAPZ and CAPI

---

I think I can write some tests in `azure/services/groups/groups_test.go`. I gotta check it out though!

There are only two tests in it for now

- TestReconcileGroups
- TestDeleteGroups

I'll have to write mine in `TestReconcileGroups`

and it has mock clients for Azure API I think, I can see usages of some structs from `azure/services/groups/mock_groups/client_mock.go`

Actually, `TestReconcileGroups` mocks away `CreateOrUpdateAsync` by using the mock `CreateOrUpdateAsync` in `azure/services/groups/mock_groups/client_mock.go`

Ideally we have to test `CreateOrUpdateAsync` in `azure/services/groups/client.go` to ensure it does updates properly

---

TODO - handle if existingTagValue is `nil` [DONE]

`existingTagValue == nil || (existingTagValue != nil && *existingTagValue != tagValue)`

`existingTagValue != nil` seems unnecessary. also, alternative - use two ifs - easier to read too

```go
if existingTagValue == nil {
    ...
}

if *existingTagValue != tagValue {
    ...
}
```

---

Thinking about using https://docs.microsoft.com/en-us/rest/api/resources/tags/update-at-scope API for updating resource group tags. But I gotta beware, this is different from https://docs.microsoft.com/en-us/rest/api/resources/tags/create-or-update-at-scope API. The code in `azure/services/tags/tags.go` uses https://docs.microsoft.com/en-us/rest/api/resources/tags/create-or-update-at-scope API as of now using `s.client.CreateOrUpdateAtScope` and `ac.tags.CreateOrUpdateAtScope` method calls. We want to use `func (client TagsClient) UpdateAtScope(ctx context.Context, scope string, parameters TagsPatchResource) (result TagsResource, err error) {` method call from the Azure Tags Client. We want to use `Merge` operation, that is `TagsPatchOperationMerge TagsPatchOperation = "Merge"` of the API - https://docs.microsoft.com/en-us/rest/api/resources/tags/update-at-scope#tagspatchoperation , so `Merge` will be the value of `Operation` field, `Properties` field value will be the tags

Actually, for deletion to work, PATCH is not enough. So Create or Update At Scope is needed

I finished the code but now I'm wondering what will happen in the first iteration - how tags will be added to the annotation JSON. Looks like it won't be added the first time

---

```bash

export AZURE_TENANT_ID=""
export AZURE_SUBSCRIPTION_ID=""
export AZURE_CLIENT_ID=""
export AZURE_CLIENT_SECRET=""

# Cluster settings.
export CLUSTER_NAME="capz-cluster"
export AZURE_VNET_NAME=${CLUSTER_NAME}-vnet

# Azure settings.
export AZURE_LOCATION="southcentralus"
export AZURE_RESOURCE_GROUP=${CLUSTER_NAME}
export AZURE_SUBSCRIPTION_ID_B64="$(echo -n "$AZURE_SUBSCRIPTION_ID" | base64 | tr -d '\n')"
export AZURE_TENANT_ID_B64="$(echo -n "$AZURE_TENANT_ID" | base64 | tr -d '\n')"
export AZURE_CLIENT_ID_B64="$(echo -n "$AZURE_CLIENT_ID" | base64 | tr -d '\n')"
export AZURE_CLIENT_SECRET_B64="$(echo -n "$AZURE_CLIENT_SECRET" | base64 | tr -d '\n')"

# Machine settings.
export CONTROL_PLANE_MACHINE_COUNT=1
export AZURE_CONTROL_PLANE_MACHINE_TYPE="Standard_D2s_v3"
export AZURE_NODE_MACHINE_TYPE="Standard_D2s_v3"
export WORKER_MACHINE_COUNT=1
export KUBERNETES_VERSION="v1.22.1"

# Generate SSH key.
# If you want to provide your own key, skip this step and set AZURE_SSH_PUBLIC_KEY_B64 to your existing file.
SSH_KEY_FILE=.sshkey
rm -f "${SSH_KEY_FILE}" 2>/dev/null
ssh-keygen -t rsa -b 2048 -f "${SSH_KEY_FILE}" -N '' 1>/dev/null
echo "Machine SSH key generated in ${SSH_KEY_FILE}"
# For Linux the ssh key needs to be b64 encoded because we use the azure api to set it
# Windows doesn't support setting ssh keys so we use cloudbase-init to set which doesn't require base64
export AZURE_SSH_PUBLIC_KEY_B64=$(cat "${SSH_KEY_FILE}.pub" | base64 | tr -d '\r\n')
export AZURE_SSH_PUBLIC_KEY=$(cat "${SSH_KEY_FILE}.pub" | tr -d '\r\n')

export AZURE_CLUSTER_IDENTITY_SECRET_NAME="cluster-identity-secret"
export CLUSTER_IDENTITY_NAME=${CLUSTER_IDENTITY_NAME:="cluster-identity"}
export AZURE_CLUSTER_IDENTITY_SECRET_NAMESPACE="default"
```

```bash
cluster-api-provider-azure $ stern -n capz-system capz-controller-manager -t 5 | rg -i "error|fail"
+ capz-controller-manager-76c696b6cc-nh9wv › manager
+ capz-controller-manager-76c696b6cc-nh9wv › kube-rbac-proxy
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:15.879299900+05:30 E0923 14:12:15.879037       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:22.875988800+05:30 E0923 14:12:22.875670       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:30.511118500+05:30 E0923 14:12:30.510614       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:37.673116200+05:30 E0923 14:12:37.672558       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:44.692072300+05:30 E0923 14:12:44.691776       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:51.633400300+05:30 E0923 14:12:51.632155       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:42:59.081522100+05:30 E0923 14:12:59.081169       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:05.986649000+05:30 E0923 14:13:05.986304       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:13.002784500+05:30 E0923 14:13:13.002484       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:19.449834800+05:30 E0923 14:13:19.449587       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:25.840993300+05:30 E0923 14:13:25.840549       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:33.024922300+05:30 E0923 14:13:33.024651       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:39.324008500+05:30 E0923 14:13:39.323707       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
capz-controller-manager-76c696b6cc-nh9wv manager 2021-09-23T19:43:49.901566400+05:30 E0923 14:13:49.901164       9 controller.go:304] controller-runtime/manager/controller/azuremachine "msg"="Reconciler error" "error"="failed to reconcile AzureMachine: failed to create virtual machine: failed to create VM capz-cluster-control-plane-94hhq in resource group capz-cluster: compute.VirtualMachinesClient#CreateOrUpdate: Failure sending request: StatusCode=0 -- Original Error: Code=\"PlatformImageNotFound\" Message=\"The platform image 'cncf-upstream:capi:k8s-1dot22dot2-ubuntu-2004:latest' is not available. Verify that all fields in the storage profile are correct. For more details about storage profile information, please refer to https://aka.ms/storageprofile\" Target=\"imageReference\"" "name"="capz-cluster-control-plane-94hhq" "namespace"="default" "reconciler group"="infrastructure.cluster.x-k8s.io" "reconciler kind"="AzureMachine"
^C
cluster-api-provider-azure $
```

---

```bash
cluster-api-provider-azure $ make create-workload-cluster
# Create workload Cluster.
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/envsubst-drone < /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/templates/cluster-template.yaml | kubectl apply -f -
cluster.cluster.x-k8s.io/capz-cluster created
azurecluster.infrastructure.cluster.x-k8s.io/capz-cluster created
kubeadmcontrolplane.controlplane.cluster.x-k8s.io/capz-cluster-control-plane created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-control-plane created
machinedeployment.cluster.x-k8s.io/capz-cluster-md-0 created
azuremachinetemplate.infrastructure.cluster.x-k8s.io/capz-cluster-md-0 created
kubeadmconfigtemplate.bootstrap.cluster.x-k8s.io/capz-cluster-md-0 created
azureclusteridentity.infrastructure.cluster.x-k8s.io/cluster-identity unchanged
# Wait for the kubeconfig to become available.
timeout --foreground 300 bash -c "while ! kubectl get secrets | grep capz-cluster-kubeconfig; do sleep 1; done"
capz-cluster-kubeconfig                 cluster.x-k8s.io/secret               1      1s
# Get kubeconfig and store it locally.
kubectl get secrets capz-cluster-kubeconfig -o json | jq -r .data.value | base64 --decode > ./kubeconfig
timeout --foreground 600 bash -c "while ! kubectl --kubeconfig=./kubeconfig get nodes | grep master; do sleep 1; done"
error: the server doesn't have a resource type "nodes"
capz-cluster-control-plane-g8pzr   NotReady   control-plane,master   8s    v1.22.1
run "kubectl --kubeconfig=./kubeconfig ..." to work with the new target cluster
cluster-api-provider-azure $ ktx
Switched to context "kind-capz".
cluster-api-provider-azure $ kubectl --kubeconfig kubeconfig get nodes -A
NAME                               STATUS     ROLES                  AGE     VERSION
capz-cluster-control-plane-g8pzr   Ready      control-plane,master   2m10s   v1.22.1
capz-cluster-md-0-j7q7z            NotReady   <none>                 12s     v1.22.1
cluster-api-provider-azure $ kubectl --kubeconfig kubeconfig get nodes -A -w
NAMESPACE   NAME                               STATUS     ROLES                  AGE     VERSION
            capz-cluster-control-plane-g8pzr   Ready      control-plane,master   2m24s   v1.22.1
            capz-cluster-md-0-j7q7z            NotReady   <none>                 26s     v1.22.1

            capz-cluster-md-0-j7q7z            Ready      <none>                 30s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 30s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 32s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 35s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 35s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 35s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 45s     v1.22.1
            capz-cluster-md-0-j7q7z            Ready      <none>                 60s     v1.22.1
^Ccluster-api-provider-azure $

cluster-api-provider-azure $ k get azuremachines
NAME                               READY   STATE
capz-cluster-control-plane-g8pzr
capz-cluster-md-0-j7q7z
cluster-api-provider-azure $ k get azuremachines -w
NAME                               READY   STATE
capz-cluster-control-plane-g8pzr
capz-cluster-md-0-j7q7z


capz-cluster-control-plane-g8pzr
capz-cluster-control-plane-g8pzr   true
capz-cluster-control-plane-g8pzr   true
capz-cluster-control-plane-g8pzr   true
capz-cluster-control-plane-g8pzr   false   Updating
capz-cluster-control-plane-g8pzr   false   Updating
capz-cluster-control-plane-g8pzr   true    Succeeded
^Ccluster-api-provider-azure k get azurecluster
NAME           CLUSTER        READY   REASON
capz-cluster   capz-cluster   True
cluster-api-provider-azure $ k get cluster
NAME           PHASE
capz-cluster   Provisioned
cluster-api-provider-azure $ k get cluster
NAME           PHASE
capz-cluster   Provisioned
cluster-api-provider-azure $ k get azuremachines -w
NAME                               READY   STATE
capz-cluster-control-plane-g8pzr   true    Succeeded
capz-cluster-md-0-j7q7z


capz-cluster-md-0-j7q7z
capz-cluster-md-0-j7q7z            true
capz-cluster-md-0-j7q7z            true
capz-cluster-md-0-j7q7z            true
capz-cluster-md-0-j7q7z            false   Updating
capz-cluster-md-0-j7q7z            false   Updating
capz-cluster-md-0-j7q7z            true    Succeeded
^Ccluster-api-provider-azure $

Last login: Thu Sep 23 19:40:12 on ttys002
cluster-api-provider-azure $ k get machines -w
NAME                               PROVIDERID   PHASE          VERSION
capz-cluster-control-plane-zpw9g                Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                Pending        v1.22.1

capz-cluster-control-plane-zpw9g                Provisioning   v1.22.1
capz-cluster-control-plane-zpw9g                Provisioning   v1.22.1
capz-cluster-control-plane-zpw9g                Provisioning   v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Provisioning   v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Provisioned    v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Provisioned    v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Provisioned    v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Provisioned    v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Provisioned    v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Running        v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Running        v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Running        v1.22.1
capz-cluster-control-plane-zpw9g   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-control-plane-g8pzr   Running        v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Pending        v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Pending        v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Provisioning   v1.22.1

capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr                                                                                                                                                                          Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-md-0-j7q7z            Provisioning   v1.22.1
capz-cluster-md-0-598fdf57-rwbkr   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-md-0-j7q7z            Running        v1.22.1
capz-cluster-md-0-598fdf57-rwbkr   azure:///subscriptions/abcdef-abcd-abcdef/resourceGroups/capz-cluster/providers/Microsoft.Compute/virtualMachines/capz-cluster-md-0-j7q7z            Running        v1.22.1
^Ccluster-api-provider-azure $
```

---

```bash
cluster-api-provider-azure $ go test -v ./...
# sigs.k8s.io/cluster-api-provider-azure/azure/services/groups [sigs.k8s.io/cluster-api-provider-azure/azure/services/groups.test]
azure/services/groups/groups_test.go:115:5: cannot use scopeMock (type *mock_groups.MockGroupScope) as type GroupScope in field value:
	*mock_groups.MockGroupScope does not implement GroupScope (missing AdditionalTags method)
azure/services/groups/groups_test.go:249:5: cannot use scopeMock (type *mock_groups.MockGroupScope) as type GroupScope in field value:
	*mock_groups.MockGroupScope does not implement GroupScope (missing AdditionalTags method)
?   	sigs.k8s.io/cluster-api-provider-azure	[no test files]
=== RUN   TestFuzzyConversion
=== RUN   TestFuzzyConversion/for_AzureCluster
=== RUN   TestFuzzyConversion/for_AzureCluster/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureCluster/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureMachine
=== RUN   TestFuzzyConversion/for_AzureMachine/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureMachine/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureMachineTemplate
=== RUN   TestFuzzyConversion/for_AzureMachineTemplate/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureMachineTemplate/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureClusterIdentity
=== RUN   TestFuzzyConversion/for_AzureClusterIdentity/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureClusterIdentity/hub-spoke-hub
--- PASS: TestFuzzyConversion (21.35s)
    --- PASS: TestFuzzyConversion/for_AzureCluster (7.75s)
        --- PASS: TestFuzzyConversion/for_AzureCluster/spoke-hub-spoke (3.07s)
        --- PASS: TestFuzzyConversion/for_AzureCluster/hub-spoke-hub (4.68s)
    --- PASS: TestFuzzyConversion/for_AzureMachine (6.50s)
        --- PASS: TestFuzzyConversion/for_AzureMachine/spoke-hub-spoke (3.22s)
        --- PASS: TestFuzzyConversion/for_AzureMachine/hub-spoke-hub (3.28s)
    --- PASS: TestFuzzyConversion/for_AzureMachineTemplate (4.42s)
        --- PASS: TestFuzzyConversion/for_AzureMachineTemplate/spoke-hub-spoke (1.73s)
        --- PASS: TestFuzzyConversion/for_AzureMachineTemplate/hub-spoke-hub (2.68s)
    --- PASS: TestFuzzyConversion/for_AzureClusterIdentity (2.68s)
        --- PASS: TestFuzzyConversion/for_AzureClusterIdentity/spoke-hub-spoke (1.01s)
        --- PASS: TestFuzzyConversion/for_AzureClusterIdentity/hub-spoke-hub (1.67s)
=== RUN   TestTags_Merge
=== RUN   TestTags_Merge/nil_other
=== PAUSE TestTags_Merge/nil_other
=== RUN   TestTags_Merge/empty_other
=== PAUSE TestTags_Merge/empty_other
=== RUN   TestTags_Merge/disjoint
=== PAUSE TestTags_Merge/disjoint
=== RUN   TestTags_Merge/overlapping,_other_wins
=== PAUSE TestTags_Merge/overlapping,_other_wins
=== CONT  TestTags_Merge/nil_other
=== CONT  TestTags_Merge/disjoint
=== CONT  TestTags_Merge/empty_other
=== CONT  TestTags_Merge/overlapping,_other_wins
--- PASS: TestTags_Merge (0.00s)
    --- PASS: TestTags_Merge/nil_other (0.00s)
    --- PASS: TestTags_Merge/disjoint (0.00s)
    --- PASS: TestTags_Merge/empty_other (0.00s)
    --- PASS: TestTags_Merge/overlapping,_other_wins (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha3	22.515s
=== RUN   TestResourceGroupDefault
=== RUN   TestResourceGroupDefault/default_empty_rg
=== PAUSE TestResourceGroupDefault/default_empty_rg
=== RUN   TestResourceGroupDefault/don't_change_if_mismatched
=== PAUSE TestResourceGroupDefault/don't_change_if_mismatched
=== CONT  TestResourceGroupDefault/default_empty_rg
=== CONT  TestResourceGroupDefault/don't_change_if_mismatched
--- PASS: TestResourceGroupDefault (0.00s)
    --- PASS: TestResourceGroupDefault/default_empty_rg (0.00s)
    --- PASS: TestResourceGroupDefault/don't_change_if_mismatched (0.00s)
=== RUN   TestVnetDefaults
=== RUN   TestVnetDefaults/resource_group_vnet_specified
=== PAUSE TestVnetDefaults/resource_group_vnet_specified
=== RUN   TestVnetDefaults/vnet_not_specified
=== PAUSE TestVnetDefaults/vnet_not_specified
=== RUN   TestVnetDefaults/custom_CIDR
=== PAUSE TestVnetDefaults/custom_CIDR
=== RUN   TestVnetDefaults/IPv6_enabled
=== PAUSE TestVnetDefaults/IPv6_enabled
=== CONT  TestVnetDefaults/resource_group_vnet_specified
=== CONT  TestVnetDefaults/custom_CIDR
=== CONT  TestVnetDefaults/IPv6_enabled
=== CONT  TestVnetDefaults/vnet_not_specified
--- PASS: TestVnetDefaults (0.00s)
    --- PASS: TestVnetDefaults/resource_group_vnet_specified (0.00s)
    --- PASS: TestVnetDefaults/custom_CIDR (0.00s)
    --- PASS: TestVnetDefaults/IPv6_enabled (0.00s)
    --- PASS: TestVnetDefaults/vnet_not_specified (0.00s)
=== RUN   TestSubnetDefaults
=== RUN   TestSubnetDefaults/no_subnets
=== PAUSE TestSubnetDefaults/no_subnets
=== RUN   TestSubnetDefaults/subnets_with_custom_attributes
=== PAUSE TestSubnetDefaults/subnets_with_custom_attributes
=== RUN   TestSubnetDefaults/subnets_specified
=== PAUSE TestSubnetDefaults/subnets_specified
=== RUN   TestSubnetDefaults/subnets_route_tables_specified
=== PAUSE TestSubnetDefaults/subnets_route_tables_specified
=== RUN   TestSubnetDefaults/only_node_subnet_specified
=== PAUSE TestSubnetDefaults/only_node_subnet_specified
=== RUN   TestSubnetDefaults/subnets_specified_with_IPv6_enabled
=== PAUSE TestSubnetDefaults/subnets_specified_with_IPv6_enabled
=== RUN   TestSubnetDefaults/subnets_with_custom_security_group
=== PAUSE TestSubnetDefaults/subnets_with_custom_security_group
=== CONT  TestSubnetDefaults/no_subnets
=== CONT  TestSubnetDefaults/only_node_subnet_specified
=== CONT  TestSubnetDefaults/subnets_with_custom_security_group
=== CONT  TestSubnetDefaults/subnets_route_tables_specified
=== CONT  TestSubnetDefaults/subnets_with_custom_attributes
=== CONT  TestSubnetDefaults/subnets_specified_with_IPv6_enabled
=== CONT  TestSubnetDefaults/subnets_specified
--- PASS: TestSubnetDefaults (0.00s)
    --- PASS: TestSubnetDefaults/no_subnets (0.00s)
    --- PASS: TestSubnetDefaults/only_node_subnet_specified (0.00s)
    --- PASS: TestSubnetDefaults/subnets_with_custom_attributes (0.00s)
    --- PASS: TestSubnetDefaults/subnets_route_tables_specified (0.00s)
    --- PASS: TestSubnetDefaults/subnets_with_custom_security_group (0.00s)
    --- PASS: TestSubnetDefaults/subnets_specified (0.00s)
    --- PASS: TestSubnetDefaults/subnets_specified_with_IPv6_enabled (0.00s)
=== RUN   TestAPIServerLBDefaults
=== RUN   TestAPIServerLBDefaults/no_lb
=== PAUSE TestAPIServerLBDefaults/no_lb
=== RUN   TestAPIServerLBDefaults/internal_lb
=== PAUSE TestAPIServerLBDefaults/internal_lb
=== CONT  TestAPIServerLBDefaults/no_lb
=== CONT  TestAPIServerLBDefaults/internal_lb
--- PASS: TestAPIServerLBDefaults (0.00s)
    --- PASS: TestAPIServerLBDefaults/no_lb (0.00s)
    --- PASS: TestAPIServerLBDefaults/internal_lb (0.00s)
=== RUN   TestAzureEnviromentDefault
=== RUN   TestAzureEnviromentDefault/default_empty_azure_env
=== PAUSE TestAzureEnviromentDefault/default_empty_azure_env
=== RUN   TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud
=== PAUSE TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud
=== RUN   TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud
=== PAUSE TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud
=== CONT  TestAzureEnviromentDefault/default_empty_azure_env
=== CONT  TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud
=== CONT  TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud
--- PASS: TestAzureEnviromentDefault (0.00s)
    --- PASS: TestAzureEnviromentDefault/default_empty_azure_env (0.00s)
    --- PASS: TestAzureEnviromentDefault/azure_env_set_to_AzurePublicCloud (0.00s)
    --- PASS: TestAzureEnviromentDefault/azure_env_set_to_AzureGermanCloud (0.00s)
=== RUN   TestNodeOutboundLBDefaults
=== RUN   TestNodeOutboundLBDefaults/default_lb_for_public_clusters
=== PAUSE TestNodeOutboundLBDefaults/default_lb_for_public_clusters
=== RUN   TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB
=== PAUSE TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB
=== RUN   TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets
=== PAUSE TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets
=== RUN   TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them
=== PAUSE TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them
=== RUN   TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them
=== PAUSE TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them
=== RUN   TestNodeOutboundLBDefaults/no_lb_for_private_clusters
=== PAUSE TestNodeOutboundLBDefaults/no_lb_for_private_clusters
=== RUN   TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values
=== PAUSE TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values
=== CONT  TestNodeOutboundLBDefaults/default_lb_for_public_clusters
=== CONT  TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them
=== CONT  TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values
=== CONT  TestNodeOutboundLBDefaults/no_lb_for_private_clusters
=== CONT  TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB
=== CONT  TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets
=== CONT  TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them
--- PASS: TestNodeOutboundLBDefaults (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/default_lb_for_public_clusters (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_enabled_on_all_of_them (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/NodeOutboundLB_declared_as_input_with_non-default_IdleTimeoutInMinutes_and_FrontendIPsCount_values (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/NAT_Gateway_enabled_-_no_LB (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/no_lb_for_private_clusters (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/NAT_Gateway_enabled_on_1_of_2_node_subnets (0.00s)
    --- PASS: TestNodeOutboundLBDefaults/multiple_node_subnets,_NAT_Gateway_not_enabled_in_any_of_them (0.00s)
=== RUN   TestControlPlaneOutboundLBDefaults
=== RUN   TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters
=== PAUSE TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters
=== RUN   TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters
=== PAUSE TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters
=== RUN   TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1
=== PAUSE TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1
=== CONT  TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters
=== CONT  TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1
=== CONT  TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters
--- PASS: TestControlPlaneOutboundLBDefaults (0.00s)
    --- PASS: TestControlPlaneOutboundLBDefaults/no_cp_lb_for_public_clusters (0.00s)
    --- PASS: TestControlPlaneOutboundLBDefaults/no_cp_lb_for_private_clusters (0.00s)
    --- PASS: TestControlPlaneOutboundLBDefaults/frontendIPsCount_>_1 (0.00s)
=== RUN   TestBastionDefault
=== RUN   TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set
=== RUN   TestBastionDefault/no_bastion_set
=== PAUSE TestBastionDefault/no_bastion_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_no_settings
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_no_settings
=== RUN   TestBastionDefault/azure_bastion_enabled_with_name_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_name_set
=== RUN   TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set
=== PAUSE TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_no_settings
=== CONT  TestBastionDefault/no_bastion_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_name_set
=== CONT  TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set
--- PASS: TestBastionDefault (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_subnet_fully_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_no_settings (0.00s)
    --- PASS: TestBastionDefault/no_bastion_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_subnet_partially_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_name_set (0.00s)
    --- PASS: TestBastionDefault/azure_bastion_enabled_with_public_IP_name_set (0.00s)
=== RUN   TestClusterNameValidation
=== RUN   TestClusterNameValidation/cluster_name_more_than_44_characters
=== RUN   TestClusterNameValidation/cluster_name_with_letters
=== RUN   TestClusterNameValidation/cluster_name_with_upper_case_letters
=== RUN   TestClusterNameValidation/cluster_name_with_hyphen
=== RUN   TestClusterNameValidation/cluster_name_with_letters_and_numbers
=== RUN   TestClusterNameValidation/cluster_name_with_special_characters
=== RUN   TestClusterNameValidation/cluster_name_starting_with_underscore
=== RUN   TestClusterNameValidation/cluster_name_starting_with_number
=== RUN   TestClusterNameValidation/cluster_name_with_underscore
=== RUN   TestClusterNameValidation/cluster_name_with_period
--- PASS: TestClusterNameValidation (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_more_than_44_characters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_letters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_upper_case_letters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_hyphen (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_letters_and_numbers (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_special_characters (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_starting_with_underscore (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_starting_with_number (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_underscore (0.00s)
    --- PASS: TestClusterNameValidation/cluster_name_with_period (0.00s)
=== RUN   TestClusterWithPreexistingVnetValid
=== RUN   TestClusterWithPreexistingVnetValid/azurecluster_with_pre-existing_vnet_-_valid
--- PASS: TestClusterWithPreexistingVnetValid (0.00s)
    --- PASS: TestClusterWithPreexistingVnetValid/azurecluster_with_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestClusterWithPreexistingVnetInvalid
=== RUN   TestClusterWithPreexistingVnetInvalid/azurecluster_with_pre-existing_vnet_-_invalid
--- PASS: TestClusterWithPreexistingVnetInvalid (0.00s)
    --- PASS: TestClusterWithPreexistingVnetInvalid/azurecluster_with_pre-existing_vnet_-_invalid (0.00s)
=== RUN   TestClusterWithoutPreexistingVnetValid
=== RUN   TestClusterWithoutPreexistingVnetValid/azurecluster_without_pre-existing_vnet_-_valid
--- PASS: TestClusterWithoutPreexistingVnetValid (0.00s)
    --- PASS: TestClusterWithoutPreexistingVnetValid/azurecluster_without_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestClusterSpecWithPreexistingVnetValid
=== RUN   TestClusterSpecWithPreexistingVnetValid/azurecluster_spec_with_pre-existing_vnet_-_valid
--- PASS: TestClusterSpecWithPreexistingVnetValid (0.00s)
    --- PASS: TestClusterSpecWithPreexistingVnetValid/azurecluster_spec_with_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestClusterSpecWithPreexistingVnetInvalid
=== RUN   TestClusterSpecWithPreexistingVnetInvalid/azurecluster_spec_with_pre-existing_vnet_-_invalid
--- PASS: TestClusterSpecWithPreexistingVnetInvalid (0.00s)
    --- PASS: TestClusterSpecWithPreexistingVnetInvalid/azurecluster_spec_with_pre-existing_vnet_-_invalid (0.00s)
=== RUN   TestClusterSpecWithoutPreexistingVnetValid
=== RUN   TestClusterSpecWithoutPreexistingVnetValid/azurecluster_spec_without_pre-existing_vnet_-_valid
--- PASS: TestClusterSpecWithoutPreexistingVnetValid (0.00s)
    --- PASS: TestClusterSpecWithoutPreexistingVnetValid/azurecluster_spec_without_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestNetworkSpecWithPreexistingVnetValid
=== RUN   TestNetworkSpecWithPreexistingVnetValid/azurecluster_networkspec_with_pre-existing_vnet_-_valid
--- PASS: TestNetworkSpecWithPreexistingVnetValid (0.00s)
    --- PASS: TestNetworkSpecWithPreexistingVnetValid/azurecluster_networkspec_with_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestNetworkSpecWithPreexistingVnetLackRequiredSubnets
=== RUN   TestNetworkSpecWithPreexistingVnetLackRequiredSubnets/azurecluster_networkspec_with_pre-existing_vnet_-_lack_required_subnets
--- PASS: TestNetworkSpecWithPreexistingVnetLackRequiredSubnets (0.00s)
    --- PASS: TestNetworkSpecWithPreexistingVnetLackRequiredSubnets/azurecluster_networkspec_with_pre-existing_vnet_-_lack_required_subnets (0.00s)
=== RUN   TestNetworkSpecWithPreexistingVnetInvalidResourceGroup
=== RUN   TestNetworkSpecWithPreexistingVnetInvalidResourceGroup/azurecluster_networkspec_with_pre-existing_vnet_-_invalid_resource_group
--- PASS: TestNetworkSpecWithPreexistingVnetInvalidResourceGroup (0.00s)
    --- PASS: TestNetworkSpecWithPreexistingVnetInvalidResourceGroup/azurecluster_networkspec_with_pre-existing_vnet_-_invalid_resource_group (0.00s)
=== RUN   TestNetworkSpecWithoutPreexistingVnetValid
=== RUN   TestNetworkSpecWithoutPreexistingVnetValid/azurecluster_networkspec_without_pre-existing_vnet_-_valid
--- PASS: TestNetworkSpecWithoutPreexistingVnetValid (0.00s)
    --- PASS: TestNetworkSpecWithoutPreexistingVnetValid/azurecluster_networkspec_without_pre-existing_vnet_-_valid (0.00s)
=== RUN   TestResourceGroupValid
=== RUN   TestResourceGroupValid/resourcegroup_name_-_valid
--- PASS: TestResourceGroupValid (0.00s)
    --- PASS: TestResourceGroupValid/resourcegroup_name_-_valid (0.00s)
=== RUN   TestResourceGroupInvalid
=== RUN   TestResourceGroupInvalid/resourcegroup_name_-_invalid
--- PASS: TestResourceGroupInvalid (0.00s)
    --- PASS: TestResourceGroupInvalid/resourcegroup_name_-_invalid (0.00s)
=== RUN   TestValidateVnetCIDR
=== RUN   TestValidateVnetCIDR/valid_subnet_cidr
=== RUN   TestValidateVnetCIDR/invalid_subnet_cidr_not_in_the_right_format
--- PASS: TestValidateVnetCIDR (0.00s)
    --- PASS: TestValidateVnetCIDR/valid_subnet_cidr (0.00s)
    --- PASS: TestValidateVnetCIDR/invalid_subnet_cidr_not_in_the_right_format (0.00s)
=== RUN   TestSubnetsValid
=== RUN   TestSubnetsValid/subnets_-_valid
--- PASS: TestSubnetsValid (0.00s)
    --- PASS: TestSubnetsValid/subnets_-_valid (0.00s)
=== RUN   TestSubnetsInvalidSubnetName
=== RUN   TestSubnetsInvalidSubnetName/subnets_-_invalid_subnet_name
--- PASS: TestSubnetsInvalidSubnetName (0.00s)
    --- PASS: TestSubnetsInvalidSubnetName/subnets_-_invalid_subnet_name (0.00s)
=== RUN   TestSubnetsInvalidLackRequiredSubnet
=== RUN   TestSubnetsInvalidLackRequiredSubnet/subnets_-_lack_required_subnet
--- PASS: TestSubnetsInvalidLackRequiredSubnet (0.00s)
    --- PASS: TestSubnetsInvalidLackRequiredSubnet/subnets_-_lack_required_subnet (0.00s)
=== RUN   TestSubnetNamesNotUnique
=== RUN   TestSubnetNamesNotUnique/subnets_-_names_not_unique
--- PASS: TestSubnetNamesNotUnique (0.00s)
    --- PASS: TestSubnetNamesNotUnique/subnets_-_names_not_unique (0.00s)
=== RUN   TestSubnetNameValid
=== RUN   TestSubnetNameValid/subnet_name_-_valid
--- PASS: TestSubnetNameValid (0.00s)
    --- PASS: TestSubnetNameValid/subnet_name_-_valid (0.00s)
=== RUN   TestSubnetNameInvalid
=== RUN   TestSubnetNameInvalid/subnet_name_-_invalid
--- PASS: TestSubnetNameInvalid (0.00s)
    --- PASS: TestSubnetNameInvalid/subnet_name_-_invalid (0.00s)
=== RUN   TestValidateSubnetCIDR
=== RUN   TestValidateSubnetCIDR/valid_subnet_cidr
=== RUN   TestValidateSubnetCIDR/invalid_subnet_cidr_not_in_the_right_format
=== RUN   TestValidateSubnetCIDR/subnet_cidr_not_in_vnet_range
=== RUN   TestValidateSubnetCIDR/subnet_cidr_in_atleast_one_vnet's_range_in_case_of_multiple_vnet_cidr_blocks
--- PASS: TestValidateSubnetCIDR (0.00s)
    --- PASS: TestValidateSubnetCIDR/valid_subnet_cidr (0.00s)
    --- PASS: TestValidateSubnetCIDR/invalid_subnet_cidr_not_in_the_right_format (0.00s)
    --- PASS: TestValidateSubnetCIDR/subnet_cidr_not_in_vnet_range (0.00s)
    --- PASS: TestValidateSubnetCIDR/subnet_cidr_in_atleast_one_vnet's_range_in_case_of_multiple_vnet_cidr_blocks (0.00s)
=== RUN   TestValidateSecurityRule
=== RUN   TestValidateSecurityRule/security_rule_-_valid_priority
=== PAUSE TestValidateSecurityRule/security_rule_-_valid_priority
=== RUN   TestValidateSecurityRule/security_rule_-_invalid_low_priority
=== PAUSE TestValidateSecurityRule/security_rule_-_invalid_low_priority
=== RUN   TestValidateSecurityRule/security_rule_-_invalid_high_priority
=== PAUSE TestValidateSecurityRule/security_rule_-_invalid_high_priority
=== CONT  TestValidateSecurityRule/security_rule_-_valid_priority
=== CONT  TestValidateSecurityRule/security_rule_-_invalid_high_priority
=== CONT  TestValidateSecurityRule/security_rule_-_invalid_low_priority
--- PASS: TestValidateSecurityRule (0.00s)
    --- PASS: TestValidateSecurityRule/security_rule_-_valid_priority (0.00s)
    --- PASS: TestValidateSecurityRule/security_rule_-_invalid_high_priority (0.00s)
    --- PASS: TestValidateSecurityRule/security_rule_-_invalid_low_priority (0.00s)
=== RUN   TestValidateAPIServerLB
=== RUN   TestValidateAPIServerLB/invalid_SKU
=== PAUSE TestValidateAPIServerLB/invalid_SKU
=== RUN   TestValidateAPIServerLB/invalid_Type
=== PAUSE TestValidateAPIServerLB/invalid_Type
=== RUN   TestValidateAPIServerLB/invalid_Name
=== PAUSE TestValidateAPIServerLB/invalid_Name
=== RUN   TestValidateAPIServerLB/too_many_IP_configs
=== PAUSE TestValidateAPIServerLB/too_many_IP_configs
=== RUN   TestValidateAPIServerLB/public_LB_with_private_IP
=== PAUSE TestValidateAPIServerLB/public_LB_with_private_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_public_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_public_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_invalid_private_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_invalid_private_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP
=== RUN   TestValidateAPIServerLB/internal_LB_with_in_range_private_IP
=== PAUSE TestValidateAPIServerLB/internal_LB_with_in_range_private_IP
=== CONT  TestValidateAPIServerLB/invalid_SKU
=== CONT  TestValidateAPIServerLB/internal_LB_with_public_IP
=== CONT  TestValidateAPIServerLB/too_many_IP_configs
=== CONT  TestValidateAPIServerLB/public_LB_with_private_IP
=== CONT  TestValidateAPIServerLB/invalid_Name
=== CONT  TestValidateAPIServerLB/invalid_Type
=== CONT  TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP
=== CONT  TestValidateAPIServerLB/internal_LB_with_in_range_private_IP
=== CONT  TestValidateAPIServerLB/internal_LB_with_invalid_private_IP
--- PASS: TestValidateAPIServerLB (0.00s)
    --- PASS: TestValidateAPIServerLB/invalid_SKU (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_public_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/public_LB_with_private_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/too_many_IP_configs (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_out_of_range_private_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/invalid_Name (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_invalid_private_IP (0.00s)
    --- PASS: TestValidateAPIServerLB/invalid_Type (0.00s)
    --- PASS: TestValidateAPIServerLB/internal_LB_with_in_range_private_IP (0.00s)
=== RUN   TestPrivateDNSZoneName
=== RUN   TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName
=== PAUSE TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName
=== RUN   TestPrivateDNSZoneName/testValidPrivateDNSZoneName
=== PAUSE TestPrivateDNSZoneName/testValidPrivateDNSZoneName
=== RUN   TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore
=== PAUSE TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore
=== RUN   TestPrivateDNSZoneName/testBadAPIServerLBType
=== PAUSE TestPrivateDNSZoneName/testBadAPIServerLBType
=== CONT  TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName
=== CONT  TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore
=== CONT  TestPrivateDNSZoneName/testValidPrivateDNSZoneName
=== CONT  TestPrivateDNSZoneName/testBadAPIServerLBType
--- PASS: TestPrivateDNSZoneName (0.00s)
    --- PASS: TestPrivateDNSZoneName/testValidPrivateDNSZoneNameWithUnderscore (0.00s)
    --- PASS: TestPrivateDNSZoneName/testInvalidPrivateDNSZoneName (0.00s)
    --- PASS: TestPrivateDNSZoneName/testValidPrivateDNSZoneName (0.00s)
    --- PASS: TestPrivateDNSZoneName/testBadAPIServerLBType (0.00s)
=== RUN   TestValidateNodeOutboundLB
=== RUN   TestValidateNodeOutboundLB/no_lb_for_public_clusters
=== PAUSE TestValidateNodeOutboundLB/no_lb_for_public_clusters
=== RUN   TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters
=== PAUSE TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters
=== RUN   TestValidateNodeOutboundLB/invalid_ID_update
=== PAUSE TestValidateNodeOutboundLB/invalid_ID_update
=== RUN   TestValidateNodeOutboundLB/invalid_Name_update
=== PAUSE TestValidateNodeOutboundLB/invalid_Name_update
=== RUN   TestValidateNodeOutboundLB/invalid_SKU_update
=== PAUSE TestValidateNodeOutboundLB/invalid_SKU_update
=== RUN   TestValidateNodeOutboundLB/invalid_FrontendIps_update
=== PAUSE TestValidateNodeOutboundLB/invalid_FrontendIps_update
=== RUN   TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes
=== PAUSE TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes
=== RUN   TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== PAUSE TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== CONT  TestValidateNodeOutboundLB/no_lb_for_public_clusters
=== CONT  TestValidateNodeOutboundLB/invalid_SKU_update
=== CONT  TestValidateNodeOutboundLB/invalid_Name_update
=== CONT  TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes
=== CONT  TestValidateNodeOutboundLB/invalid_FrontendIps_update
=== CONT  TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters
=== CONT  TestValidateNodeOutboundLB/invalid_ID_update
=== CONT  TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value
--- PASS: TestValidateNodeOutboundLB (0.00s)
    --- PASS: TestValidateNodeOutboundLB/no_lb_for_public_clusters (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_SKU_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_Name_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/FrontendIps_can_update_when_frontendIpsCount_changes (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_FrontendIps_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/no_lb_allowed_for_internal_clusters (0.00s)
    --- PASS: TestValidateNodeOutboundLB/invalid_ID_update (0.00s)
    --- PASS: TestValidateNodeOutboundLB/frontend_ips_count_exceeds_max_value (0.00s)
=== RUN   TestValidateControlPlaneNodeOutboundLB
=== RUN   TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters
=== PAUSE TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters
=== RUN   TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters
=== PAUSE TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters
=== RUN   TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters
=== PAUSE TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters
=== RUN   TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== PAUSE TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== CONT  TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value
=== CONT  TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters
=== CONT  TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters
=== CONT  TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters
--- PASS: TestValidateControlPlaneNodeOutboundLB (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_set_for_private_clusters (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/frontend_ips_count_exceeds_max_value (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_cannot_be_set_for_public_clusters (0.00s)
    --- PASS: TestValidateControlPlaneNodeOutboundLB/cp_outbound_lb_can_be_nil_for_private_clusters (0.00s)
=== RUN   TestValidateCloudProviderConfigOverrides
=== RUN   TestValidateCloudProviderConfigOverrides/both_old_and_new_config_nil
=== RUN   TestValidateCloudProviderConfigOverrides/both_old_and_new_config_are_same
=== RUN   TestValidateCloudProviderConfigOverrides/old_and_new_config_are_not_same
=== RUN   TestValidateCloudProviderConfigOverrides/new_config_is_nil
=== RUN   TestValidateCloudProviderConfigOverrides/old_config_is_nil
--- PASS: TestValidateCloudProviderConfigOverrides (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/both_old_and_new_config_nil (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/both_old_and_new_config_are_same (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/old_and_new_config_are_not_same (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/new_config_is_nil (0.00s)
    --- PASS: TestValidateCloudProviderConfigOverrides/old_config_is_nil (0.00s)
=== RUN   TestAzureCluster_ValidateCreate
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== RUN   TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
--- PASS: TestAzureCluster_ValidateCreate (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_without_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name (0.00s)
    --- PASS: TestAzureCluster_ValidateCreate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name (0.00s)
=== RUN   TestAzureCluster_ValidateUpdate
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable
=== RUN   TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01
=== PAUSE TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01
=== RUN   TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable
=== PAUSE TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable
=== CONT  TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name
--- PASS: TestAzureCluster_ValidateUpdate (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_node_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_resource_group_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_location_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_subnet_name (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable#01 (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/control_plane_outbound_lb_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_azureEnvironment_is_immutable (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_invalid_resourcegroup_name (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_with_pre-existing_vnet_-_lack_control_plane_subnet (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_without_pre-existing_vnet_-_valid_spec (0.00s)
    --- PASS: TestAzureCluster_ValidateUpdate/azurecluster_subscription_ID_is_immutable (0.00s)
=== RUN   TestImageOptional
--- PASS: TestImageOptional (0.00s)
=== RUN   TestImageTooManyDetails
--- PASS: TestImageTooManyDetails (0.00s)
=== RUN   TestSharedImageGalleryValid
--- PASS: TestSharedImageGalleryValid (0.00s)
=== RUN   TestMarketPlaceImageValid
--- PASS: TestMarketPlaceImageValid (0.00s)
=== RUN   TestImageByIDValid
--- PASS: TestImageByIDValid (0.00s)
=== RUN   TestAzureMachineSpec_SetDefaultSSHPublicKey
--- PASS: TestAzureMachineSpec_SetDefaultSSHPublicKey (0.09s)
=== RUN   TestAzureMachineSpec_SetIdentityDefaults
--- PASS: TestAzureMachineSpec_SetIdentityDefaults (0.00s)
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/no_disks
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/no_disks
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing
=== RUN   TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified
=== PAUSE TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/no_disks
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified
=== CONT  TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified
--- PASS: TestAzureMachineSpec_SetDataDisksDefaults (0.00s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/Some_LUNs_missing (0.12s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/CachingType_unspecified (0.13s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/no_LUNs_specified (0.23s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/All_LUNs_specified (0.23s)
    --- PASS: TestAzureMachineSpec_SetDataDisksDefaults/no_disks (0.24s)
=== RUN   TestAzureMachine_ValidateSSHKey
=== RUN   TestAzureMachine_ValidateSSHKey/valid_ssh_key
=== RUN   TestAzureMachine_ValidateSSHKey/invalid_ssh_key
=== RUN   TestAzureMachine_ValidateSSHKey/ssh_key_not_base64_encoded
--- PASS: TestAzureMachine_ValidateSSHKey (0.25s)
    --- PASS: TestAzureMachine_ValidateSSHKey/valid_ssh_key (0.00s)
    --- PASS: TestAzureMachine_ValidateSSHKey/invalid_ssh_key (0.00s)
    --- PASS: TestAzureMachine_ValidateSSHKey/ssh_key_not_base64_encoded (0.00s)
=== RUN   TestAzureMachine_ValidateOSDisk
=== RUN   TestAzureMachine_ValidateOSDisk/valid_os_disk_spec
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_cache_type
=== RUN   TestAzureMachine_ValidateOSDisk/valid_ephemeral_os_disk_spec
=== RUN   TestAzureMachine_ValidateOSDisk/byoc_encryption_with_ephemeral_os_disk_spec
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-0
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-1
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-2
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-3
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-4
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-5
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-6
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-7
=== RUN   TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-8
--- PASS: TestAzureMachine_ValidateOSDisk (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/valid_os_disk_spec (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_cache_type (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/valid_ephemeral_os_disk_spec (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/byoc_encryption_with_ephemeral_os_disk_spec (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-0 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-1 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-2 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-3 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-4 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-5 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-6 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-7 (0.00s)
    --- PASS: TestAzureMachine_ValidateOSDisk/invalid_os_disk_spec-8 (0.00s)
=== RUN   TestAzureMachine_ValidateDataDisks
=== RUN   TestAzureMachine_ValidateDataDisks/valid_nil_data_disks
=== RUN   TestAzureMachine_ValidateDataDisks/valid_empty_data_disks
=== RUN   TestAzureMachine_ValidateDataDisks/valid_disks
=== RUN   TestAzureMachine_ValidateDataDisks/duplicate_names
=== RUN   TestAzureMachine_ValidateDataDisks/duplicate_LUNs
=== RUN   TestAzureMachine_ValidateDataDisks/invalid_disk_size
=== RUN   TestAzureMachine_ValidateDataDisks/empty_name
=== RUN   TestAzureMachine_ValidateDataDisks/invalid_disk_cachingType
=== RUN   TestAzureMachine_ValidateDataDisks/valid_disk_cachingType
=== RUN   TestAzureMachine_ValidateDataDisks/valid_managed_disk_storage_account_type
=== RUN   TestAzureMachine_ValidateDataDisks/invalid_managed_disk_storage_account_type
--- PASS: TestAzureMachine_ValidateDataDisks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_nil_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_empty_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/duplicate_names (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/duplicate_LUNs (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/invalid_disk_size (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/empty_name (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/invalid_disk_cachingType (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_disk_cachingType (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/valid_managed_disk_storage_account_type (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisks/invalid_managed_disk_storage_account_type (0.00s)
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/valid_UUID
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/wrong_Identity_type
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/not_a_valid_UUID
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/empty
=== RUN   TestAzureMachine_ValidateSystemAssignedIdentity/changed
--- PASS: TestAzureMachine_ValidateSystemAssignedIdentity (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/valid_UUID (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/wrong_Identity_type (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/not_a_valid_UUID (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/empty (0.00s)
    --- PASS: TestAzureMachine_ValidateSystemAssignedIdentity/changed (0.00s)
=== RUN   TestAzureMachine_ValidateDataDisksUpdate
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/valid_nil_data_disks
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/valid_empty_data_disks
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/valid_data_disk_updates
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/cannot_update_data_disk_fields_after_machine_creation
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/validate_updates_to_optional_fields
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_added_after_machine_creation
=== RUN   TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_removed_after_machine_creation
--- PASS: TestAzureMachine_ValidateDataDisksUpdate (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/valid_nil_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/valid_empty_data_disks (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/valid_data_disk_updates (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/cannot_update_data_disk_fields_after_machine_creation (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/validate_updates_to_optional_fields (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_added_after_machine_creation (0.00s)
    --- PASS: TestAzureMachine_ValidateDataDisksUpdate/data_disks_cannot_be_removed_after_machine_creation (0.00s)
=== RUN   TestAzureMachine_ValidateCreate
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_full
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_publisher
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_shared_gallery_image_-_full
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_subscription
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_with_id
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_without_id
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_valid_SSHPublicKey
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_without_SSHPublicKey
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_invalid_SSHPublicKey
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_list_of_user-assigned_identities
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_empty_list_of_user-assigned_identities
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_valid_osDisk_cache_type
=== RUN   TestAzureMachine_ValidateCreate/azuremachine_with_invalid_osDisk_cache_type
--- PASS: TestAzureMachine_ValidateCreate (0.19s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_full (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_publisher (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_shared_gallery_image_-_full (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_marketplace_image_-_missing_subscription (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_with_id (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_image_by_-_without_id (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_without_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_empty_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_valid_osDisk_cache_type (0.00s)
    --- PASS: TestAzureMachine_ValidateCreate/azuremachine_with_invalid_osDisk_cache_type (0.00s)
=== RUN   TestAzureMachine_ValidateUpdate
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.image_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.image_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.Identity_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.Identity_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.UserAssignedIdentities_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.UserAssignedIdentities_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.RoleAssignmentName_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.RoleAssignmentName_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.OSDisk_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.OSDisk_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.DataDisks_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.DataDisks_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SSHPublicKey_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SSHPublicKey_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AllocatePublicIP_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AllocatePublicIP_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.EnableIPForwarding_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.EnableIPForwarding_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AcceleratedNetworking_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AcceleratedNetworking_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SpotVMOptions_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SpotVMOptions_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SecurityProfile_is_immutable
=== RUN   TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SecurityProfile_is_immutable
--- PASS: TestAzureMachine_ValidateUpdate (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.image_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.image_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.Identity_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.Identity_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.UserAssignedIdentities_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.UserAssignedIdentities_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.RoleAssignmentName_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.RoleAssignmentName_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.OSDisk_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.OSDisk_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.DataDisks_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.DataDisks_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SSHPublicKey_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SSHPublicKey_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AllocatePublicIP_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AllocatePublicIP_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.EnableIPForwarding_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.EnableIPForwarding_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.AcceleratedNetworking_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.AcceleratedNetworking_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SpotVMOptions_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SpotVMOptions_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/invalidTest:_azuremachine.spec.SecurityProfile_is_immutable (0.00s)
    --- PASS: TestAzureMachine_ValidateUpdate/validTest:_azuremachine.spec.SecurityProfile_is_immutable (0.00s)
=== RUN   TestAzureMachine_Default
--- PASS: TestAzureMachine_Default (0.52s)
=== RUN   TestAzureMachineTemplate_ValidateCreate
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplane_image_-_full
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_publisher
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_shared_gallery_image_-_full
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_subscription
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_with_id
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_without_id
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_SSHPublicKey
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_without_SSHPublicKey
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_SSHPublicKey
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_list_of_user-assigned_identities
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_empty_list_of_user-assigned_identities
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_osDisk_cache_type
=== RUN   TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_osDisk_cache_type
--- PASS: TestAzureMachineTemplate_ValidateCreate (0.27s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplane_image_-_full (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_publisher (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_shared_gallery_image_-_full (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_marketplace_image_-_missing_subscription (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_with_id (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_image_by_-_without_id (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_without_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_empty_list_of_user-assigned_identities (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_valid_osDisk_cache_type (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateCreate/azuremachinetemplate_with_invalid_osDisk_cache_type (0.00s)
=== RUN   TestAzureMachineTemplate_ValidateUpdate
=== RUN   TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec
=== PAUSE TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec
=== RUN   TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata
=== PAUSE TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata
=== CONT  TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec
=== CONT  TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata
--- PASS: TestAzureMachineTemplate_ValidateUpdate (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_immutable_spec (0.00s)
    --- PASS: TestAzureMachineTemplate_ValidateUpdate/AzureMachineTemplate_with_mutable_metadata (0.00s)
=== RUN   TestTags_Merge
=== RUN   TestTags_Merge/nil_other
=== PAUSE TestTags_Merge/nil_other
=== RUN   TestTags_Merge/empty_other
=== PAUSE TestTags_Merge/empty_other
=== RUN   TestTags_Merge/disjoint
=== PAUSE TestTags_Merge/disjoint
=== RUN   TestTags_Merge/overlapping,_other_wins
=== PAUSE TestTags_Merge/overlapping,_other_wins
=== CONT  TestTags_Merge/nil_other
=== CONT  TestTags_Merge/disjoint
=== CONT  TestTags_Merge/empty_other
=== CONT  TestTags_Merge/overlapping,_other_wins
--- PASS: TestTags_Merge (0.00s)
    --- PASS: TestTags_Merge/nil_other (0.00s)
    --- PASS: TestTags_Merge/empty_other (0.00s)
    --- PASS: TestTags_Merge/disjoint (0.00s)
    --- PASS: TestTags_Merge/overlapping,_other_wins (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4	4.075s
=== RUN   TestGetDefaultImageSKUID
=== RUN   TestGetDefaultImageSKUID/v1.14.9
=== RUN   TestGetDefaultImageSKUID/v1.14.10
=== RUN   TestGetDefaultImageSKUID/v1.15.6
=== RUN   TestGetDefaultImageSKUID/v1.15.7
=== RUN   TestGetDefaultImageSKUID/v1.16.3
=== RUN   TestGetDefaultImageSKUID/v1.16.4
=== RUN   TestGetDefaultImageSKUID/1.12.0
=== RUN   TestGetDefaultImageSKUID/1.1.notvalid.semver
=== RUN   TestGetDefaultImageSKUID/v1.19.3
=== RUN   TestGetDefaultImageSKUID/v1.20.8
=== RUN   TestGetDefaultImageSKUID/v1.21.2
=== RUN   TestGetDefaultImageSKUID/v1.20.8#01
=== RUN   TestGetDefaultImageSKUID/v1.21.2#01
--- PASS: TestGetDefaultImageSKUID (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.14.9 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.14.10 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.15.6 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.15.7 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.16.3 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.16.4 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/1.12.0 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/1.1.notvalid.semver (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.19.3 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.20.8 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.21.2 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.20.8#01 (0.00s)
    --- PASS: TestGetDefaultImageSKUID/v1.21.2#01 (0.00s)
=== RUN   TestAutoRestClientAppendUserAgent
=== RUN   TestAutoRestClientAppendUserAgent/should_append_extension_to_user_agent_if_extension_is_not_empty
=== RUN   TestAutoRestClientAppendUserAgent/should_no_changed_if_extension_is_empty
--- PASS: TestAutoRestClientAppendUserAgent (0.00s)
    --- PASS: TestAutoRestClientAppendUserAgent/should_append_extension_to_user_agent_if_extension_is_not_empty (0.00s)
    --- PASS: TestAutoRestClientAppendUserAgent/should_no_changed_if_extension_is_empty (0.00s)
=== RUN   TestGetDefaultUbuntuImage
=== RUN   TestGetDefaultUbuntuImage/v1.15.6
=== RUN   TestGetDefaultUbuntuImage/v1.17.11
=== RUN   TestGetDefaultUbuntuImage/v1.18.19
=== RUN   TestGetDefaultUbuntuImage/v1.18.20
=== RUN   TestGetDefaultUbuntuImage/v1.19.11
=== RUN   TestGetDefaultUbuntuImage/v1.19.12
=== RUN   TestGetDefaultUbuntuImage/v1.21.1
=== RUN   TestGetDefaultUbuntuImage/v1.21.2
=== RUN   TestGetDefaultUbuntuImage/v1.22.0
=== RUN   TestGetDefaultUbuntuImage/v1.23.6
--- PASS: TestGetDefaultUbuntuImage (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.15.6 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.17.11 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.18.19 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.18.20 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.19.11 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.19.12 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.21.1 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.21.2 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.22.0 (0.00s)
    --- PASS: TestGetDefaultUbuntuImage/v1.23.6 (0.00s)
=== RUN   TestMSCorrelationIDSendDecorator
--- PASS: TestMSCorrelationIDSendDecorator (0.00s)
=== RUN   TestVMSS_HasModelChanges
=== RUN   TestVMSS_HasModelChanges/two_empty_VMSS
=== RUN   TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes
=== RUN   TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes#01
=== RUN   TestVMSS_HasModelChanges/same_default_VMSS
=== RUN   TestVMSS_HasModelChanges/with_different_identity
=== RUN   TestVMSS_HasModelChanges/with_different_Zones
=== RUN   TestVMSS_HasModelChanges/with_empty_image
=== RUN   TestVMSS_HasModelChanges/with_different_image_reference_ID
=== RUN   TestVMSS_HasModelChanges/with_different_SKU
=== RUN   TestVMSS_HasModelChanges/with_different_Tags
--- PASS: TestVMSS_HasModelChanges (0.00s)
    --- PASS: TestVMSS_HasModelChanges/two_empty_VMSS (0.00s)
    --- PASS: TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes (0.00s)
    --- PASS: TestVMSS_HasModelChanges/one_empty_and_other_with_image_changes#01 (0.00s)
    --- PASS: TestVMSS_HasModelChanges/same_default_VMSS (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_identity (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_Zones (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_empty_image (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_image_reference_ID (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_SKU (0.00s)
    --- PASS: TestVMSS_HasModelChanges/with_different_Tags (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure	0.789s
=== RUN   Test_GetRecordType
=== RUN   Test_GetRecordType/ipv4
=== PAUSE Test_GetRecordType/ipv4
=== RUN   Test_GetRecordType/ipv6
=== PAUSE Test_GetRecordType/ipv6
=== RUN   Test_GetRecordType/default
=== PAUSE Test_GetRecordType/default
=== CONT  Test_GetRecordType/ipv4
=== CONT  Test_GetRecordType/default
=== CONT  Test_GetRecordType/ipv6
--- PASS: Test_GetRecordType (0.00s)
    --- PASS: Test_GetRecordType/ipv4 (0.00s)
    --- PASS: Test_GetRecordType/default (0.00s)
    --- PASS: Test_GetRecordType/ipv6 (0.00s)
=== RUN   Test_SDKToFuture
=== RUN   Test_SDKToFuture/valid_future
=== PAUSE Test_SDKToFuture/valid_future
=== CONT  Test_SDKToFuture/valid_future
--- PASS: Test_SDKToFuture (0.00s)
    --- PASS: Test_SDKToFuture/valid_future (0.00s)
=== RUN   Test_FutureToSDK
=== RUN   Test_FutureToSDK/data_is_empty
=== PAUSE Test_FutureToSDK/data_is_empty
=== RUN   Test_FutureToSDK/data_is_not_base64_encoded
=== PAUSE Test_FutureToSDK/data_is_not_base64_encoded
=== RUN   Test_FutureToSDK/base64_data_is_not_a_valid_future
=== PAUSE Test_FutureToSDK/base64_data_is_not_a_valid_future
=== RUN   Test_FutureToSDK/valid_future_data
=== PAUSE Test_FutureToSDK/valid_future_data
=== CONT  Test_FutureToSDK/data_is_empty
=== CONT  Test_FutureToSDK/base64_data_is_not_a_valid_future
=== CONT  Test_FutureToSDK/valid_future_data
=== CONT  Test_FutureToSDK/data_is_not_base64_encoded
--- PASS: Test_FutureToSDK (0.00s)
    --- PASS: Test_FutureToSDK/data_is_empty (0.00s)
    --- PASS: Test_FutureToSDK/base64_data_is_not_a_valid_future (0.00s)
    --- PASS: Test_FutureToSDK/data_is_not_base64_encoded (0.00s)
    --- PASS: Test_FutureToSDK/valid_future_data (0.00s)
=== RUN   Test_UserAssignedIdentitiesToVMSDK
=== RUN   Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData
=== PAUSE Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData
=== RUN   Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError
=== PAUSE Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError
=== CONT  Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData
=== CONT  Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError
--- PASS: Test_UserAssignedIdentitiesToVMSDK (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSDK/ShouldPopulateWithData (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSDK/ShouldFailWithError (0.00s)
=== RUN   Test_UserAssignedIdentitiesToVMSSSDK
=== RUN   Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData
=== PAUSE Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData
=== RUN   Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError
=== PAUSE Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError
=== CONT  Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData
=== CONT  Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError
--- PASS: Test_UserAssignedIdentitiesToVMSSSDK (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSSSDK/ShouldPopulateWithData (0.00s)
    --- PASS: Test_UserAssignedIdentitiesToVMSSSDK/ShouldFailWithError (0.00s)
=== RUN   Test_SDKToVMSS
=== RUN   Test_SDKToVMSS/ShouldPopulateWithData
=== PAUSE Test_SDKToVMSS/ShouldPopulateWithData
=== CONT  Test_SDKToVMSS/ShouldPopulateWithData
--- PASS: Test_SDKToVMSS (0.00s)
    --- PASS: Test_SDKToVMSS/ShouldPopulateWithData (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/converters	1.834s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/mock_azure	[no test files]
=== RUN   TestGettingEnvironment
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_empty
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzurePublicCloud
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureUSGovernmentCloud
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureChina
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureGermany
=== RUN   TestGettingEnvironment/AZURE_ENVIRONMENT_has_an_invalid_value
--- PASS: TestGettingEnvironment (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_empty (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzurePublicCloud (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureUSGovernmentCloud (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureChina (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_is_AzureGermany (0.00s)
    --- PASS: TestGettingEnvironment/AZURE_ENVIRONMENT_has_an_invalid_value (0.00s)
=== RUN   TestGettingSecurityRules
--- PASS: TestGettingSecurityRules (0.00s)
=== RUN   TestOutboundLBName
=== RUN   TestOutboundLBName/public_cluster_node_outbound_lb
=== RUN   TestOutboundLBName/public_cluster_control_plane_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_with_node_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_without_node_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_with_control_plane_outbound_lb
=== RUN   TestOutboundLBName/private_cluster_without_control_plane_outbound_lb
--- PASS: TestOutboundLBName (0.00s)
    --- PASS: TestOutboundLBName/public_cluster_node_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/public_cluster_control_plane_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_with_node_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_without_node_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_with_control_plane_outbound_lb (0.00s)
    --- PASS: TestOutboundLBName/private_cluster_without_control_plane_outbound_lb (0.00s)
=== RUN   TestAllowedNamespaces
=== RUN   TestAllowedNamespaces/allow_any_cluster_namespace_when_empty
=== RUN   TestAllowedNamespaces/no_namespaces_allowed_when_list_is_empty
=== RUN   TestAllowedNamespaces/allow_cluster_with_namespace_in_list
=== RUN   TestAllowedNamespaces/don't_allow_cluster_with_namespace_not_in_list
=== RUN   TestAllowedNamespaces/allow_cluster_when_namespace_has_selector_with_matching_label
=== RUN   TestAllowedNamespaces/don't_allow_cluster_when_namespace_has_selector_with_different_label
--- PASS: TestAllowedNamespaces (0.00s)
    --- PASS: TestAllowedNamespaces/allow_any_cluster_namespace_when_empty (0.00s)
    --- PASS: TestAllowedNamespaces/no_namespaces_allowed_when_list_is_empty (0.00s)
    --- PASS: TestAllowedNamespaces/allow_cluster_with_namespace_in_list (0.00s)
    --- PASS: TestAllowedNamespaces/don't_allow_cluster_with_namespace_not_in_list (0.00s)
    --- PASS: TestAllowedNamespaces/allow_cluster_when_namespace_has_selector_with_matching_label (0.00s)
    --- PASS: TestAllowedNamespaces/don't_allow_cluster_when_namespace_has_selector_with_different_label (0.00s)
=== RUN   TestMachineScope_Name
=== RUN   TestMachineScope_Name/if_provider_ID_exists,_use_it
=== RUN   TestMachineScope_Name/linux_can_be_any_length
=== RUN   TestMachineScope_Name/Windows_name_with_long_MachineName_and_short_cluster_name
=== RUN   TestMachineScope_Name/Windows_name_with_long_MachineName_and_long_cluster_name
--- PASS: TestMachineScope_Name (0.00s)
    --- PASS: TestMachineScope_Name/if_provider_ID_exists,_use_it (0.00s)
    --- PASS: TestMachineScope_Name/linux_can_be_any_length (0.00s)
    --- PASS: TestMachineScope_Name/Windows_name_with_long_MachineName_and_short_cluster_name (0.00s)
    --- PASS: TestMachineScope_Name/Windows_name_with_long_MachineName_and_long_cluster_name (0.00s)
=== RUN   TestMachineScope_GetVMID
=== RUN   TestMachineScope_GetVMID/returns_the_vm_name_from_provider_ID
=== RUN   TestMachineScope_GetVMID/returns_empty_if_provider_ID_is_invalid
--- PASS: TestMachineScope_GetVMID (0.00s)
    --- PASS: TestMachineScope_GetVMID/returns_the_vm_name_from_provider_ID (0.00s)
    --- PASS: TestMachineScope_GetVMID/returns_empty_if_provider_ID_is_invalid (0.00s)
=== RUN   TestMachineScope_ProviderID
=== RUN   TestMachineScope_ProviderID/returns_the_entire_provider_ID
=== RUN   TestMachineScope_ProviderID/returns_empty_if_provider_ID_is_invalid
--- PASS: TestMachineScope_ProviderID (0.00s)
    --- PASS: TestMachineScope_ProviderID/returns_the_entire_provider_ID (0.00s)
    --- PASS: TestMachineScope_ProviderID/returns_empty_if_provider_ID_is_invalid (0.00s)
=== RUN   TestMachineScope_PublicIPSpecs
=== RUN   TestMachineScope_PublicIPSpecs/returns_nil_if_AllocatePublicIP_is_false
=== RUN   TestMachineScope_PublicIPSpecs/appends_to_PublicIPSpec_for_node_if_AllocatePublicIP_is_true
--- PASS: TestMachineScope_PublicIPSpecs (0.00s)
    --- PASS: TestMachineScope_PublicIPSpecs/returns_nil_if_AllocatePublicIP_is_false (0.00s)
    --- PASS: TestMachineScope_PublicIPSpecs/appends_to_PublicIPSpec_for_node_if_AllocatePublicIP_is_true (0.00s)
=== RUN   TestMachineScope_InboundNatSpecs
=== RUN   TestMachineScope_InboundNatSpecs/returns_empty_when_infra_is_not_control_plane
=== RUN   TestMachineScope_InboundNatSpecs/returns_InboundNatSpec_when_infra_is_control_plane
--- PASS: TestMachineScope_InboundNatSpecs (0.00s)
    --- PASS: TestMachineScope_InboundNatSpecs/returns_empty_when_infra_is_not_control_plane (0.00s)
    --- PASS: TestMachineScope_InboundNatSpecs/returns_InboundNatSpec_when_infra_is_control_plane (0.00s)
=== RUN   TestMachineScope_RoleAssignmentSpecs
=== RUN   TestMachineScope_RoleAssignmentSpecs/returns_empty_if_VM_identity_is_system_assigned
=== RUN   TestMachineScope_RoleAssignmentSpecs/returns_RoleAssignmentSpec_if_VM_identity_is_not_system_assigned
--- PASS: TestMachineScope_RoleAssignmentSpecs (0.00s)
    --- PASS: TestMachineScope_RoleAssignmentSpecs/returns_empty_if_VM_identity_is_system_assigned (0.00s)
    --- PASS: TestMachineScope_RoleAssignmentSpecs/returns_RoleAssignmentSpec_if_VM_identity_is_not_system_assigned (0.00s)
=== RUN   TestMachineScope_VMExtensionSpecs
=== RUN   TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_AzurePublicCloud,_it_returns_VMExtensionSpec
=== RUN   TestMachineScope_VMExtensionSpecs/If_OS_type_is_not_Linux_and_cloud_is_AzurePublicCloud,_it_returns_empty
=== RUN   TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_not_AzurePublicCloud,_it_returns_empty
--- PASS: TestMachineScope_VMExtensionSpecs (0.00s)
    --- PASS: TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_AzurePublicCloud,_it_returns_VMExtensionSpec (0.00s)
    --- PASS: TestMachineScope_VMExtensionSpecs/If_OS_type_is_not_Linux_and_cloud_is_AzurePublicCloud,_it_returns_empty (0.00s)
    --- PASS: TestMachineScope_VMExtensionSpecs/If_OS_type_is_Linux_and_cloud_is_not_AzurePublicCloud,_it_returns_empty (0.00s)
=== RUN   TestMachineScope_Subnet
=== RUN   TestMachineScope_Subnet/returns_empty_if_no_subnet_is_found_at_cluster_scope
=== RUN   TestMachineScope_Subnet/returns_the_machine_subnet_name_if_the_same_is_present_in_the_cluster_scope
=== RUN   TestMachineScope_Subnet/returns_empty_if_machine_subnet_name_is_not_present_in_the_cluster_scope
--- PASS: TestMachineScope_Subnet (0.00s)
    --- PASS: TestMachineScope_Subnet/returns_empty_if_no_subnet_is_found_at_cluster_scope (0.00s)
    --- PASS: TestMachineScope_Subnet/returns_the_machine_subnet_name_if_the_same_is_present_in_the_cluster_scope (0.00s)
    --- PASS: TestMachineScope_Subnet/returns_empty_if_machine_subnet_name_is_not_present_in_the_cluster_scope (0.00s)
=== RUN   TestMachineScope_AvailabilityZone
=== RUN   TestMachineScope_AvailabilityZone/returns_empty_if_no_failure_domain_is_present
=== RUN   TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_machine_spec
=== RUN   TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_azuremachine_spec
--- PASS: TestMachineScope_AvailabilityZone (0.00s)
    --- PASS: TestMachineScope_AvailabilityZone/returns_empty_if_no_failure_domain_is_present (0.00s)
    --- PASS: TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_machine_spec (0.00s)
    --- PASS: TestMachineScope_AvailabilityZone/returns_failure_domain_from_the_azuremachine_spec (0.00s)
=== RUN   TestMachineScope_Namespace
=== RUN   TestMachineScope_Namespace/returns_azure_machine_namespace
=== RUN   TestMachineScope_Namespace/returns_azure_machine_namespace_as_empty_if_namespace_is_no_specified
--- PASS: TestMachineScope_Namespace (0.00s)
    --- PASS: TestMachineScope_Namespace/returns_azure_machine_namespace (0.00s)
    --- PASS: TestMachineScope_Namespace/returns_azure_machine_namespace_as_empty_if_namespace_is_no_specified (0.00s)
=== RUN   TestMachineScope_IsControlPlane
=== RUN   TestMachineScope_IsControlPlane/returns_false_when_machine_is_not_control_plane
=== RUN   TestMachineScope_IsControlPlane/returns_true_when_machine_is_control_plane
--- PASS: TestMachineScope_IsControlPlane (0.00s)
    --- PASS: TestMachineScope_IsControlPlane/returns_false_when_machine_is_not_control_plane (0.00s)
    --- PASS: TestMachineScope_IsControlPlane/returns_true_when_machine_is_control_plane (0.00s)
=== RUN   TestMachineScope_Role
=== RUN   TestMachineScope_Role/returns_node_when_machine_is_worker
=== RUN   TestMachineScope_Role/returns_control-plane_when_machine_is_control_plane
--- PASS: TestMachineScope_Role (0.00s)
    --- PASS: TestMachineScope_Role/returns_node_when_machine_is_worker (0.00s)
    --- PASS: TestMachineScope_Role/returns_control-plane_when_machine_is_control_plane (0.00s)
=== RUN   TestMachineScope_AvailabilitySet
=== RUN   TestMachineScope_AvailabilitySet/returns_empty_and_false_if_availability_set_is_not_enabled
=== RUN   TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_availability_set_is_enabled_and_machine_is_control_plane
=== RUN   TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_AvailabilitySet_is_enabled_for_worker_machine_which_is_part_of_machine_deployment
=== RUN   TestMachineScope_AvailabilitySet/returns_empty_and_false_if_AvailabilitySet_is_enabled_but_worker_machine_is_not_part_of_machine_deployment
--- PASS: TestMachineScope_AvailabilitySet (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_empty_and_false_if_availability_set_is_not_enabled (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_availability_set_is_enabled_and_machine_is_control_plane (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_AvailabilitySet_name_and_true_if_AvailabilitySet_is_enabled_for_worker_machine_which_is_part_of_machine_deployment (0.00s)
    --- PASS: TestMachineScope_AvailabilitySet/returns_empty_and_false_if_AvailabilitySet_is_enabled_but_worker_machine_is_not_part_of_machine_deployment (0.00s)
=== RUN   TestMachineScope_VMState
=== RUN   TestMachineScope_VMState/returns_the_VMState_if_present_in_AzureMachine_status
=== RUN   TestMachineScope_VMState/returns_empty_if_VMState_is_not_present_in_AzureMachine_status
--- PASS: TestMachineScope_VMState (0.00s)
    --- PASS: TestMachineScope_VMState/returns_the_VMState_if_present_in_AzureMachine_status (0.00s)
    --- PASS: TestMachineScope_VMState/returns_empty_if_VMState_is_not_present_in_AzureMachine_status (0.00s)
=== RUN   TestMachineScope_GetVMImage
=== RUN   TestMachineScope_GetVMImage/returns_AzureMachine_image_is_found_if_present_in_the_AzureMachine_spec
=== RUN   TestMachineScope_GetVMImage/if_no_image_is_specified_and_os_specified_is_windows,_returns_windows_image
I0923 20:38:59.750141   47079 machine.go:525]  "msg"="No image specified for machine, using default Windows Image"  "machine"="machine-name"
=== RUN   TestMachineScope_GetVMImage/if_no_image_and_OS_is_specified,_returns_linux_image
I0923 20:38:59.750478   47079 machine.go:529]  "msg"="No image specified for machine, using default Linux Image"  "machine"="machine-name"
--- PASS: TestMachineScope_GetVMImage (0.00s)
    --- PASS: TestMachineScope_GetVMImage/returns_AzureMachine_image_is_found_if_present_in_the_AzureMachine_spec (0.00s)
    --- PASS: TestMachineScope_GetVMImage/if_no_image_is_specified_and_os_specified_is_windows,_returns_windows_image (0.00s)
    --- PASS: TestMachineScope_GetVMImage/if_no_image_and_OS_is_specified,_returns_linux_image (0.00s)
=== RUN   TestMachineScope_NICSpecs
=== RUN   TestMachineScope_NICSpecs/Node_Machine_with_no_nat_gateway_and_no_public_IP_address
=== RUN   TestMachineScope_NICSpecs/Node_Machine_with_nat_gateway
=== RUN   TestMachineScope_NICSpecs/Node_Machine_with_public_IP_address
=== RUN   TestMachineScope_NICSpecs/Control_Plane_Machine_with_private_LB
=== RUN   TestMachineScope_NICSpecs/Control_Plane_Machine_with_public_LB
--- PASS: TestMachineScope_NICSpecs (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Node_Machine_with_no_nat_gateway_and_no_public_IP_address (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Node_Machine_with_nat_gateway (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Node_Machine_with_public_IP_address (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Control_Plane_Machine_with_private_LB (0.00s)
    --- PASS: TestMachineScope_NICSpecs/Control_Plane_Machine_with_public_LB (0.00s)
=== RUN   TestMachinePoolScope_Name
=== RUN   TestMachinePoolScope_Name/linux_can_be_any_length
=== RUN   TestMachinePoolScope_Name/windows_longer_than_9_should_be_shortened
--- PASS: TestMachinePoolScope_Name (0.00s)
    --- PASS: TestMachinePoolScope_Name/linux_can_be_any_length (0.00s)
    --- PASS: TestMachinePoolScope_Name/windows_longer_than_9_should_be_shortened (0.00s)
=== RUN   TestMachinePoolScope_SetBootstrapConditions
=== RUN   TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_condition_if_provisioning_state_succeeded
=== RUN   TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_creating
=== RUN   TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_failed
--- PASS: TestMachinePoolScope_SetBootstrapConditions (0.00s)
    --- PASS: TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_condition_if_provisioning_state_succeeded (0.00s)
    --- PASS: TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_creating (0.00s)
    --- PASS: TestMachinePoolScope_SetBootstrapConditions/should_set_bootstrap_succeeded_false_condition_with_reason_if_provisioning_state_failed (0.00s)
=== RUN   TestMachinePoolScope_MaxSurge
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_1_if_no_deployment_strategy_is_set
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_1_regardless_of_replica_count_with_no_surger
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_2_as_specified_by_the_surger
=== RUN   TestMachinePoolScope_MaxSurge/default_surge_should_be_2_(50%)_of_the_desired_replicas
--- PASS: TestMachinePoolScope_MaxSurge (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_1_if_no_deployment_strategy_is_set (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_1_regardless_of_replica_count_with_no_surger (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_2_as_specified_by_the_surger (0.00s)
    --- PASS: TestMachinePoolScope_MaxSurge/default_surge_should_be_2_(50%)_of_the_desired_replicas (0.00s)
=== RUN   TestMachinePoolScope_SaveVMImageToStatus
--- PASS: TestMachinePoolScope_SaveVMImageToStatus (0.00s)
=== RUN   TestMachinePoolScope_GetVMImage
=== RUN   TestMachinePoolScope_GetVMImage/should_set_and_default_the_image_if_no_image_is_specified_for_the_AzureMachinePool
=== RUN   TestMachinePoolScope_GetVMImage/should_not_default_or_set_the_image_on_the_AzureMachinePool_if_it_already_exists
--- PASS: TestMachinePoolScope_GetVMImage (0.00s)
    --- PASS: TestMachinePoolScope_GetVMImage/should_set_and_default_the_image_if_no_image_is_specified_for_the_AzureMachinePool (0.00s)
    --- PASS: TestMachinePoolScope_GetVMImage/should_not_default_or_set_the_image_on_the_AzureMachinePool_if_it_already_exists (0.00s)
=== RUN   TestMachinePoolScope_NeedsRequeue
=== RUN   TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_not_in_succeeded_state
=== RUN   TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state
=== RUN   TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_not_match
=== RUN   TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_match
=== RUN   TestMachinePoolScope_NeedsRequeue/should_requeue_if_an_instance_VM_image_does_not_match_the_VM_image_of_the_VMSS
--- PASS: TestMachinePoolScope_NeedsRequeue (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_not_in_succeeded_state (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_not_match (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_not_requeue_if_the_machine_is_in_succeeded_state_but_desired_replica_count_does_match (0.00s)
    --- PASS: TestMachinePoolScope_NeedsRequeue/should_requeue_if_an_instance_VM_image_does_not_match_the_VM_image_of_the_VMSS (0.00s)
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs/if_there_are_three_ready_machines_with_matching_labels,_then_should_count_them
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_machine_pool_label
=== RUN   TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_cluster_name_label
--- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs (0.00s)
    --- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs/if_there_are_three_ready_machines_with_matching_labels,_then_should_count_them (0.00s)
    --- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_machine_pool_label (0.00s)
    --- PASS: TestMachinePoolScope_updateReplicasAndProviderIDs/should_only_count_machines_with_matching_cluster_name_label (0.00s)
=== RUN   TestNewMachinePoolMachineScope
=== RUN   TestNewMachinePoolMachineScope/successfully_create_machine_scope
=== RUN   TestNewMachinePoolMachineScope/no_client
=== RUN   TestNewMachinePoolMachineScope/no_ClusterScope
=== RUN   TestNewMachinePoolMachineScope/no_MachinePool
=== RUN   TestNewMachinePoolMachineScope/no_AzureMachinePool
=== RUN   TestNewMachinePoolMachineScope/no_AzureMachinePoolMachine
--- PASS: TestNewMachinePoolMachineScope (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/successfully_create_machine_scope (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_client (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_ClusterScope (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_MachinePool (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_AzureMachinePool (0.00s)
    --- PASS: TestNewMachinePoolMachineScope/no_AzureMachinePoolMachine (0.00s)
=== RUN   TestMachineScope_UpdateStatus
=== RUN   TestMachineScope_UpdateStatus/should_set_kubernetes_version,_ready,_and_node_reference_upon_finding_the_node
=== RUN   TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready
=== RUN   TestMachineScope_UpdateStatus/fails_fetching_the_node
=== RUN   TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready#01
=== RUN   TestMachineScope_UpdateStatus/node_is_not_found
=== RUN   TestMachineScope_UpdateStatus/node_is_found_by_ObjectReference
=== RUN   TestMachineScope_UpdateStatus/instance_information_with_latest_model_populates_the_AMPM_status
--- PASS: TestMachineScope_UpdateStatus (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/should_set_kubernetes_version,_ready,_and_node_reference_upon_finding_the_node (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/fails_fetching_the_node (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/should_not_mark_AMPM_ready_if_node_is_not_ready#01 (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/node_is_not_found (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/node_is_found_by_ObjectReference (0.00s)
    --- PASS: TestMachineScope_UpdateStatus/instance_information_with_latest_model_populates_the_AMPM_status (0.00s)
=== RUN   TestMachinePoolMachineScope_CordonAndDrain
=== RUN   TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_provider_ID
=== RUN   TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_node_reference
=== RUN   TestMachinePoolMachineScope_CordonAndDrain/if_GetNodeByProviderID_fails_with_an_error,_an_error_will_be_returned
--- PASS: TestMachinePoolMachineScope_CordonAndDrain (0.00s)
    --- PASS: TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_provider_ID (0.00s)
    --- PASS: TestMachinePoolMachineScope_CordonAndDrain/should_skip_cordon_and_drain_if_the_node_does_not_exist_with_node_reference (0.00s)
    --- PASS: TestMachinePoolMachineScope_CordonAndDrain/if_GetNodeByProviderID_fails_with_an_error,_an_error_will_be_returned (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope	3.225s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/scope/mocks	[no test files]
=== RUN   TestMachinePoolRollingUpdateStrategy_Type
--- PASS: TestMachinePoolRollingUpdateStrategy_Type (0.00s)
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/Strategy_is_empty
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_2
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_20
=== RUN   TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_21;_rounds_up
--- PASS: TestMachinePoolRollingUpdateStrategy_Surge (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/Strategy_is_empty (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_2 (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_20 (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_Surge/MaxSurge_is_set_to_20%_and_desiredReplicas_is_21;_rounds_up (0.00s)
=== RUN   TestMachinePoolScope_maxUnavailable
=== RUN   TestMachinePoolScope_maxUnavailable/Strategy_is_empty
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_nil
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_2
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20%
=== RUN   TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20%_and_it_rounds_down
--- PASS: TestMachinePoolScope_maxUnavailable (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/Strategy_is_empty (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_nil (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_2 (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20% (0.00s)
    --- PASS: TestMachinePoolScope_maxUnavailable/MaxUnavailable_is_set_to_20%_and_it_rounds_down (0.00s)
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/should_not_select_machines_to_delete_if_less_than_desired_replica_count
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_a_machine_with_an_out-of-date_model
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_the_oldest_machine
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_creation_date
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_newest_first
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_1_is_not_the_latest_model,_delete_it.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_all_are_the_latest_model,_delete_nothing.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_2,_and_there_are_2_with_the_latest_model_==_false,_delete_2.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_45%,_and_there_are_2_with_the_latest_model_==_false,_delete_1.
=== RUN   TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_30%,_and_there_are_2_with_the_latest_model_==_false,_delete_0.
--- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/should_not_select_machines_to_delete_if_less_than_desired_replica_count (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_a_machine_with_an_out-of-date_model (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_the_oldest_machine (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_creation_date (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_over-provisioned,_select_machines_ordered_by_newest_first (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_1_is_not_the_latest_model,_delete_it. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_1,_and_all_are_the_latest_model,_delete_nothing. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_2,_and_there_are_2_with_the_latest_model_==_false,_delete_2. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_45%,_and_there_are_2_with_the_latest_model_==_false,_delete_1. (0.00s)
    --- PASS: TestMachinePoolRollingUpdateStrategy_SelectMachinesToDelete/if_maxUnavailable_is_30%,_and_there_are_2_with_the_latest_model_==_false,_delete_0. (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/scope/strategies/machinepool_deployments	1.639s
=== RUN   TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Canceled
=== RUN   TestReconcile/agentpool_in_terminal_provisioning_state
=== PAUSE TestReconcile/agentpool_in_terminal_provisioning_state
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Succeeded
=== RUN   TestReconcile/agentpool_in_terminal_provisioning_state#01
=== PAUSE TestReconcile/agentpool_in_terminal_provisioning_state#01
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Failed
=== RUN   TestReconcile/agentpool_in_terminal_provisioning_state#02
=== PAUSE TestReconcile/agentpool_in_terminal_provisioning_state#02
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: Deleting
=== RUN   TestReconcile/agentpool_in_nonterminal_provisioning_state
=== PAUSE TestReconcile/agentpool_in_nonterminal_provisioning_state
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: InProgress
=== RUN   TestReconcile/agentpool_in_nonterminal_provisioning_state#01
=== PAUSE TestReconcile/agentpool_in_nonterminal_provisioning_state#01
=== CONT  TestReconcile
    agentpools_test.go:83: Testing agentpool provision state: randomStringHere
=== RUN   TestReconcile/agentpool_in_nonterminal_provisioning_state#02
=== PAUSE TestReconcile/agentpool_in_nonterminal_provisioning_state#02
=== CONT  TestReconcile
    agentpools_test.go:251: Testing no agentpool exists
=== RUN   TestReconcile/no_agentpool_exists
=== PAUSE TestReconcile/no_agentpool_exists
=== CONT  TestReconcile
    agentpools_test.go:251: Testing fail to get existing agent pool
=== RUN   TestReconcile/fail_to_get_existing_agent_pool
=== PAUSE TestReconcile/fail_to_get_existing_agent_pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing can create an Agent Pool
=== RUN   TestReconcile/can_create_an_Agent_Pool
=== PAUSE TestReconcile/can_create_an_Agent_Pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing fail to create an Agent Pool
=== RUN   TestReconcile/fail_to_create_an_Agent_Pool
=== PAUSE TestReconcile/fail_to_create_an_Agent_Pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing fail to update an Agent Pool
=== RUN   TestReconcile/fail_to_update_an_Agent_Pool
=== PAUSE TestReconcile/fail_to_update_an_Agent_Pool
=== CONT  TestReconcile
    agentpools_test.go:251: Testing no update needed on Agent Pool
=== RUN   TestReconcile/no_update_needed_on_Agent_Pool
=== PAUSE TestReconcile/no_update_needed_on_Agent_Pool
=== CONT  TestReconcile/agentpool_in_terminal_provisioning_state
=== CONT  TestReconcile/fail_to_get_existing_agent_pool
=== CONT  TestReconcile/fail_to_update_an_Agent_Pool
=== CONT  TestReconcile/fail_to_create_an_Agent_Pool
=== CONT  TestReconcile/can_create_an_Agent_Pool
=== CONT  TestReconcile/agentpool_in_nonterminal_provisioning_state#01
=== CONT  TestReconcile/no_update_needed_on_Agent_Pool
=== CONT  TestReconcile/agentpool_in_terminal_provisioning_state#02
=== CONT  TestReconcile/agentpool_in_nonterminal_provisioning_state
=== CONT  TestReconcile/no_agentpool_exists
=== CONT  TestReconcile/agentpool_in_terminal_provisioning_state#01
=== CONT  TestReconcile/agentpool_in_nonterminal_provisioning_state#02
--- PASS: TestReconcile (0.00s)
    --- PASS: TestReconcile/fail_to_get_existing_agent_pool (0.00s)
    --- PASS: TestReconcile/can_create_an_Agent_Pool (0.00s)
    --- PASS: TestReconcile/fail_to_create_an_Agent_Pool (0.00s)
    --- PASS: TestReconcile/agentpool_in_nonterminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/agentpool_in_nonterminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/fail_to_update_an_Agent_Pool (0.00s)
    --- PASS: TestReconcile/no_agentpool_exists (0.00s)
    --- PASS: TestReconcile/agentpool_in_terminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/no_update_needed_on_Agent_Pool (0.00s)
    --- PASS: TestReconcile/agentpool_in_nonterminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/agentpool_in_terminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/agentpool_in_terminal_provisioning_state#02 (0.00s)
=== RUN   TestDeleteAgentPools
=== RUN   TestDeleteAgentPools/successfully_delete_an_existing_agent_pool
=== PAUSE TestDeleteAgentPools/successfully_delete_an_existing_agent_pool
=== RUN   TestDeleteAgentPools/agent_pool_already_deleted
=== PAUSE TestDeleteAgentPools/agent_pool_already_deleted
=== RUN   TestDeleteAgentPools/agent_pool_deletion_fails
=== PAUSE TestDeleteAgentPools/agent_pool_deletion_fails
=== CONT  TestDeleteAgentPools/successfully_delete_an_existing_agent_pool
=== CONT  TestDeleteAgentPools/agent_pool_deletion_fails
=== CONT  TestDeleteAgentPools/agent_pool_already_deleted
--- PASS: TestDeleteAgentPools (0.00s)
    --- PASS: TestDeleteAgentPools/successfully_delete_an_existing_agent_pool (0.00s)
    --- PASS: TestDeleteAgentPools/agent_pool_deletion_fails (0.00s)
    --- PASS: TestDeleteAgentPools/agent_pool_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools	3.568s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/agentpools/mock_agentpools	[no test files]
=== RUN   TestProcessOngoingOperation
=== RUN   TestProcessOngoingOperation/no_future_data_stored_in_status
=== PAUSE TestProcessOngoingOperation/no_future_data_stored_in_status
=== RUN   TestProcessOngoingOperation/future_data_is_not_valid
=== PAUSE TestProcessOngoingOperation/future_data_is_not_valid
=== RUN   TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done
=== PAUSE TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done
=== RUN   TestProcessOngoingOperation/ongoing_operation_is_not_done
=== PAUSE TestProcessOngoingOperation/ongoing_operation_is_not_done
=== RUN   TestProcessOngoingOperation/operation_is_done
=== PAUSE TestProcessOngoingOperation/operation_is_done
=== CONT  TestProcessOngoingOperation/no_future_data_stored_in_status
=== CONT  TestProcessOngoingOperation/ongoing_operation_is_not_done
=== CONT  TestProcessOngoingOperation/operation_is_done
=== CONT  TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done
=== CONT  TestProcessOngoingOperation/future_data_is_not_valid
I0923 20:38:58.844068   47074 async.go:36]  "msg"="no long running operation found"  "resource"="test-resource" "service"="test-service"
I0923 20:38:58.844128   47074 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-resource" "service"="test-service"
I0923 20:38:58.844188   47074 async.go:59]  "msg"="long running operation has completed"  "resource"="test-resource" "service"="test-service"
--- PASS: TestProcessOngoingOperation (0.00s)
    --- PASS: TestProcessOngoingOperation/future_data_is_not_valid (0.00s)
    --- PASS: TestProcessOngoingOperation/fail_to_check_if_ongoing_operation_is_done (0.00s)
    --- PASS: TestProcessOngoingOperation/no_future_data_stored_in_status (0.00s)
    --- PASS: TestProcessOngoingOperation/operation_is_done (0.00s)
    --- PASS: TestProcessOngoingOperation/ongoing_operation_is_not_done (0.00s)
=== RUN   TestCreateResource
=== RUN   TestCreateResource/create_operation_is_already_in_progress
=== PAUSE TestCreateResource/create_operation_is_already_in_progress
=== RUN   TestCreateResource/create_async_returns_success
=== PAUSE TestCreateResource/create_async_returns_success
=== RUN   TestCreateResource/error_occurs_while_running_async_create
=== PAUSE TestCreateResource/error_occurs_while_running_async_create
=== RUN   TestCreateResource/create_async_exits_before_completing
=== PAUSE TestCreateResource/create_async_exits_before_completing
=== CONT  TestCreateResource/create_operation_is_already_in_progress
=== CONT  TestCreateResource/error_occurs_while_running_async_create
=== CONT  TestCreateResource/create_async_returns_success
=== CONT  TestCreateResource/create_async_exits_before_completing
I0923 20:38:58.844531   47074 async.go:76]  "msg"="creating resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0923 20:38:58.844557   47074 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-resource" "service"="test-service"
I0923 20:38:58.844571   47074 async.go:76]  "msg"="creating resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0923 20:38:58.844585   47074 async.go:76]  "msg"="creating resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0923 20:38:58.844595   47074 async.go:91]  "msg"="successfully created resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
--- PASS: TestCreateResource (0.00s)
    --- PASS: TestCreateResource/error_occurs_while_running_async_create (0.00s)
    --- PASS: TestCreateResource/create_operation_is_already_in_progress (0.00s)
    --- PASS: TestCreateResource/create_async_returns_success (0.00s)
    --- PASS: TestCreateResource/create_async_exits_before_completing (0.00s)
=== RUN   TestDeleteResource
=== RUN   TestDeleteResource/delete_operation_is_already_in_progress
=== PAUSE TestDeleteResource/delete_operation_is_already_in_progress
=== RUN   TestDeleteResource/delete_async_returns_success
=== PAUSE TestDeleteResource/delete_async_returns_success
=== RUN   TestDeleteResource/error_occurs_while_running_async_delete
=== PAUSE TestDeleteResource/error_occurs_while_running_async_delete
=== RUN   TestDeleteResource/delete_async_exits_before_completing
=== PAUSE TestDeleteResource/delete_async_exits_before_completing
=== CONT  TestDeleteResource/delete_operation_is_already_in_progress
=== CONT  TestDeleteResource/error_occurs_while_running_async_delete
=== CONT  TestDeleteResource/delete_async_exits_before_completing
=== CONT  TestDeleteResource/delete_async_returns_success
I0923 20:38:58.844813   47074 async.go:107]  "msg"="deleting resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0923 20:38:58.844819   47074 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-resource" "service"="test-service"
I0923 20:38:58.844829   47074 async.go:107]  "msg"="deleting resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0923 20:38:58.844840   47074 async.go:107]  "msg"="deleting resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
I0923 20:38:58.844867   47074 async.go:125]  "msg"="successfully deleted resource"  "resource"="test-resource" "resourceGroup"="test-group" "service"="test-service"
--- PASS: TestDeleteResource (0.00s)
    --- PASS: TestDeleteResource/delete_operation_is_already_in_progress (0.00s)
    --- PASS: TestDeleteResource/error_occurs_while_running_async_delete (0.00s)
    --- PASS: TestDeleteResource/delete_async_exits_before_completing (0.00s)
    --- PASS: TestDeleteResource/delete_async_returns_success (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/async	2.535s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/async/mock_async	[no test files]
=== RUN   TestReconcileAvailabilitySets
=== RUN   TestReconcileAvailabilitySets/create_or_update_availability_set
=== PAUSE TestReconcileAvailabilitySets/create_or_update_availability_set
=== RUN   TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment)
=== PAUSE TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment)
=== RUN   TestReconcileAvailabilitySets/return_error
=== PAUSE TestReconcileAvailabilitySets/return_error
=== CONT  TestReconcileAvailabilitySets/create_or_update_availability_set
=== CONT  TestReconcileAvailabilitySets/return_error
=== CONT  TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment)
I0923 20:38:59.271376   47075 availabilitysets.go:83]  "msg"="creating availability set"  "availability set"="as-name"
I0923 20:38:59.271392   47075 availabilitysets.go:83]  "msg"="creating availability set"  "availability set"="as-name"
I0923 20:38:59.271579   47075 availabilitysets.go:107]  "msg"="successfully created availability set"  "availability set"="as-name"
--- PASS: TestReconcileAvailabilitySets (0.00s)
    --- PASS: TestReconcileAvailabilitySets/noop_if_the_machine_does_not_need_to_be_assigned_an_availability_set_(machines_without_a_deployment) (0.00s)
    --- PASS: TestReconcileAvailabilitySets/return_error (0.00s)
    --- PASS: TestReconcileAvailabilitySets/create_or_update_availability_set (0.00s)
=== RUN   TestDeleteAvailabilitySets
=== RUN   TestDeleteAvailabilitySets/deletes_availability_set
=== PAUSE TestDeleteAvailabilitySets/deletes_availability_set
=== RUN   TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false
=== PAUSE TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false
=== RUN   TestDeleteAvailabilitySets/noop_if_availability_set_has_vms
=== PAUSE TestDeleteAvailabilitySets/noop_if_availability_set_has_vms
=== RUN   TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404
=== PAUSE TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404
=== RUN   TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404
=== PAUSE TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404
=== RUN   TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails
=== PAUSE TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails
=== RUN   TestDeleteAvailabilitySets/returns_error_when_delete_fails
=== PAUSE TestDeleteAvailabilitySets/returns_error_when_delete_fails
=== CONT  TestDeleteAvailabilitySets/deletes_availability_set
=== CONT  TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404
=== CONT  TestDeleteAvailabilitySets/returns_error_when_delete_fails
=== CONT  TestDeleteAvailabilitySets/noop_if_availability_set_has_vms
I0923 20:38:59.271857   47075 availabilitysets.go:137]  "msg"="deleting availability set"  "availability set"="as-name"
I0923 20:38:59.271866   47075 availabilitysets.go:137]  "msg"="deleting availability set"  "availability set"="as-name"
=== CONT  TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails
I0923 20:38:59.271881   47075 availabilitysets.go:148]  "msg"="successfully delete availability set"  "availability set"="as-name"
=== CONT  TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404
I0923 20:38:59.271914   47075 availabilitysets.go:137]  "msg"="deleting availability set"  "availability set"="as-name"
=== CONT  TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false
--- PASS: TestDeleteAvailabilitySets (0.00s)
    --- PASS: TestDeleteAvailabilitySets/deletes_availability_set (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_delete_returns_404 (0.00s)
    --- PASS: TestDeleteAvailabilitySets/returns_error_when_delete_fails (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_availability_set_has_vms (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_AvailabilitySet_returns_false (0.00s)
    --- PASS: TestDeleteAvailabilitySets/returns_error_when_availability_set_get_fails (0.00s)
    --- PASS: TestDeleteAvailabilitySets/noop_if_availability_set_is_already_deleted_-_get_returns_404 (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets	2.930s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/availabilitysets/mock_availabilitysets	[no test files]
=== RUN   TestReconcileBastionHosts
=== RUN   TestReconcileBastionHosts/fail_to_get_subnets
=== PAUSE TestReconcileBastionHosts/fail_to_get_subnets
=== RUN   TestReconcileBastionHosts/fail_to_get_publicip
=== PAUSE TestReconcileBastionHosts/fail_to_get_publicip
=== RUN   TestReconcileBastionHosts/create_publicip_fails
=== PAUSE TestReconcileBastionHosts/create_publicip_fails
=== RUN   TestReconcileBastionHosts/fails_to_get_a_created_publicip
=== PAUSE TestReconcileBastionHosts/fails_to_get_a_created_publicip
=== RUN   TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip
=== PAUSE TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip
=== RUN   TestReconcileBastionHosts/bastion_successfully_created
=== PAUSE TestReconcileBastionHosts/bastion_successfully_created
=== RUN   TestReconcileBastionHosts/fail_to_create_a_bastion
=== PAUSE TestReconcileBastionHosts/fail_to_create_a_bastion
=== CONT  TestReconcileBastionHosts/fail_to_get_subnets
=== CONT  TestReconcileBastionHosts/fail_to_create_a_bastion
=== CONT  TestReconcileBastionHosts/fails_to_get_a_created_publicip
=== CONT  TestReconcileBastionHosts/bastion_successfully_created
=== CONT  TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip
=== CONT  TestReconcileBastionHosts/create_publicip_fails
=== CONT  TestReconcileBastionHosts/fail_to_get_publicip
I0923 20:39:00.618056   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618056   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618056   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618130   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618140   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618164   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618174   47094 azurebastion.go:34]  "msg"="getting azure bastion public IP"  "publicIP"="my-publicip"
I0923 20:39:00.618343   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618355   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618363   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0923 20:39:00.618366   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618379   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0923 20:39:00.618383   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618396   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618409   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618381   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0923 20:39:00.618415   47094 azurebastion.go:40]  "msg"="getting azure bastion subnet"  "subnet"={"name":"my-subnet","securityGroup":{},"routeTable":{},"natGateway":{"ip":{"name":""}}}
I0923 20:39:00.618418   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0923 20:39:00.618429   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0923 20:39:00.618435   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
I0923 20:39:00.618461   47094 azurebastion.go:46]  "msg"="creating bastion host"  "bastion"="my-bastion"
--- PASS: TestReconcileBastionHosts (0.00s)
    --- PASS: TestReconcileBastionHosts/fail_to_get_subnets (0.00s)
    --- PASS: TestReconcileBastionHosts/bastion_successfully_created (0.00s)
    --- PASS: TestReconcileBastionHosts/fails_to_get_a_created_publicip (0.00s)
    --- PASS: TestReconcileBastionHosts/fail_to_create_a_bastion (0.00s)
    --- PASS: TestReconcileBastionHosts/bastion_successfully_created_with_created_public_ip (0.00s)
    --- PASS: TestReconcileBastionHosts/create_publicip_fails (0.00s)
    --- PASS: TestReconcileBastionHosts/fail_to_get_publicip (0.00s)
=== RUN   TestDeleteBastionHost
=== RUN   TestDeleteBastionHost/successfully_delete_an_existing_bastion_host
=== PAUSE TestDeleteBastionHost/successfully_delete_an_existing_bastion_host
=== RUN   TestDeleteBastionHost/bastion_host_already_deleted
=== PAUSE TestDeleteBastionHost/bastion_host_already_deleted
=== RUN   TestDeleteBastionHost/bastion_host_deletion_fails
=== PAUSE TestDeleteBastionHost/bastion_host_deletion_fails
=== CONT  TestDeleteBastionHost/successfully_delete_an_existing_bastion_host
=== CONT  TestDeleteBastionHost/bastion_host_deletion_fails
=== CONT  TestDeleteBastionHost/bastion_host_already_deleted
I0923 20:39:00.618634   47094 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I0923 20:39:00.618641   47094 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
I0923 20:39:00.618644   47094 azurebastion.go:89]  "msg"="deleting bastion host"  "bastion"="my-bastionhost"
--- PASS: TestDeleteBastionHost (0.00s)
    --- PASS: TestDeleteBastionHost/successfully_delete_an_existing_bastion_host (0.00s)
    --- PASS: TestDeleteBastionHost/bastion_host_already_deleted (0.00s)
    --- PASS: TestDeleteBastionHost/bastion_host_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts	3.695s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/bastionhosts/mocks_bastionhosts	[no test files]
=== RUN   TestDeleteDisk
=== RUN   TestDeleteDisk/delete_the_disk
=== PAUSE TestDeleteDisk/delete_the_disk
=== RUN   TestDeleteDisk/disk_already_deleted
=== PAUSE TestDeleteDisk/disk_already_deleted
=== RUN   TestDeleteDisk/error_while_trying_to_delete_the_disk
=== PAUSE TestDeleteDisk/error_while_trying_to_delete_the_disk
=== CONT  TestDeleteDisk/delete_the_disk
=== CONT  TestDeleteDisk/error_while_trying_to_delete_the_disk
=== CONT  TestDeleteDisk/disk_already_deleted
I0923 20:39:01.053578   47097 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-1"
I0923 20:39:01.053628   47097 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-1"
I0923 20:39:01.053642   47097 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-1"
I0923 20:39:01.053852   47097 disks.go:74]  "msg"="successfully deleted disk"  "disk"="my-disk-1"
I0923 20:39:01.053857   47097 disks.go:64]  "msg"="deleting disk"  "disk"="my-disk-2"
I0923 20:39:01.053879   47097 disks.go:64]  "msg"="deleting disk"  "disk"="honk-disk"
I0923 20:39:01.053891   47097 disks.go:74]  "msg"="successfully deleted disk"  "disk"="honk-disk"
--- PASS: TestDeleteDisk (0.00s)
    --- PASS: TestDeleteDisk/error_while_trying_to_delete_the_disk (0.00s)
    --- PASS: TestDeleteDisk/disk_already_deleted (0.00s)
    --- PASS: TestDeleteDisk/delete_the_disk (0.00s)
=== RUN   TestDiskSpecs
=== RUN   TestDiskSpecs/only_os_disk
=== PAUSE TestDiskSpecs/only_os_disk
=== RUN   TestDiskSpecs/os_and_data_disks
=== PAUSE TestDiskSpecs/os_and_data_disks
=== RUN   TestDiskSpecs/os_and_multiple_data_disks
=== PAUSE TestDiskSpecs/os_and_multiple_data_disks
=== CONT  TestDiskSpecs/only_os_disk
=== CONT  TestDiskSpecs/os_and_multiple_data_disks
=== CONT  TestDiskSpecs/os_and_data_disks
--- PASS: TestDiskSpecs (0.00s)
    --- PASS: TestDiskSpecs/os_and_data_disks (0.00s)
    --- PASS: TestDiskSpecs/only_os_disk (0.00s)
    --- PASS: TestDiskSpecs/os_and_multiple_data_disks (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks	4.076s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/disks/mock_disks	[no test files]
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups [build failed]
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups/mock_groups	[no test files]
=== RUN   TestReconcileInboundNATRule
=== RUN   TestReconcileInboundNATRule/NAT_rule_successfully_created
=== PAUSE TestReconcileInboundNATRule/NAT_rule_successfully_created
=== RUN   TestReconcileInboundNATRule/fail_to_get_LB
=== PAUSE TestReconcileInboundNATRule/fail_to_get_LB
=== RUN   TestReconcileInboundNATRule/fail_to_create_NAT_rule
=== PAUSE TestReconcileInboundNATRule/fail_to_create_NAT_rule
=== RUN   TestReconcileInboundNATRule/NAT_rule_already_exists
=== PAUSE TestReconcileInboundNATRule/NAT_rule_already_exists
=== CONT  TestReconcileInboundNATRule/NAT_rule_successfully_created
=== CONT  TestReconcileInboundNATRule/fail_to_create_NAT_rule
=== CONT  TestReconcileInboundNATRule/fail_to_get_LB
=== CONT  TestReconcileInboundNATRule/NAT_rule_already_exists
I0923 20:39:01.480535   47099 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine"
I0923 20:39:01.480535   47099 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine-nat-rule"
I0923 20:39:01.480550   47099 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine"
I0923 20:39:01.480741   47099 inboundnatrules.go:129]  "msg"="NAT rule already exists"  "NAT rule"="my-machine-nat-rule"
I0923 20:39:01.480750   47099 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-other-nat-rule"
I0923 20:39:01.480555   47099 inboundnatrules.go:61]  "msg"="creating inbound NAT rule"  "NAT rule"="my-machine"
I0923 20:39:01.480763   47099 inboundnatrules.go:149]  "msg"="Found available port"  "port"=22
I0923 20:39:01.480765   47099 inboundnatrules.go:143]  "msg"="Found available port"  "port"=2202
I0923 20:39:01.480774   47099 inboundnatrules.go:96]  "msg"="Creating rule %s using port %d"  "NAT rule"="my-other-nat-rule" "port"=22
I0923 20:39:01.480781   47099 inboundnatrules.go:96]  "msg"="Creating rule %s using port %d"  "NAT rule"="my-machine" "port"=2202
I0923 20:39:01.480787   47099 inboundnatrules.go:103]  "msg"="successfully created inbound NAT rule"  "NAT rule"="my-other-nat-rule"
I0923 20:39:01.480790   47099 inboundnatrules.go:149]  "msg"="Found available port"  "port"=22
I0923 20:39:01.480805   47099 inboundnatrules.go:96]  "msg"="Creating rule %s using port %d"  "NAT rule"="my-machine" "port"=22
I0923 20:39:01.480826   47099 inboundnatrules.go:103]  "msg"="successfully created inbound NAT rule"  "NAT rule"="my-machine"
--- PASS: TestReconcileInboundNATRule (0.00s)
    --- PASS: TestReconcileInboundNATRule/fail_to_get_LB (0.00s)
    --- PASS: TestReconcileInboundNATRule/NAT_rule_already_exists (0.00s)
    --- PASS: TestReconcileInboundNATRule/fail_to_create_NAT_rule (0.00s)
    --- PASS: TestReconcileInboundNATRule/NAT_rule_successfully_created (0.00s)
=== RUN   TestDeleteNetworkInterface
=== RUN   TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule
=== PAUSE TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule
=== RUN   TestDeleteNetworkInterface/NAT_rule_already_deleted
=== PAUSE TestDeleteNetworkInterface/NAT_rule_already_deleted
=== RUN   TestDeleteNetworkInterface/NAT_rule_deletion_fails
=== PAUSE TestDeleteNetworkInterface/NAT_rule_deletion_fails
=== CONT  TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule
=== CONT  TestDeleteNetworkInterface/NAT_rule_deletion_fails
=== CONT  TestDeleteNetworkInterface/NAT_rule_already_deleted
I0923 20:39:01.481016   47099 inboundnatrules.go:114]  "msg"="deleting inbound NAT rule"  "NAT rule"="azure-md-0"
I0923 20:39:01.481017   47099 inboundnatrules.go:114]  "msg"="deleting inbound NAT rule"  "NAT rule"="azure-md-2"
I0923 20:39:01.481028   47099 inboundnatrules.go:114]  "msg"="deleting inbound NAT rule"  "NAT rule"="azure-md-1"
I0923 20:39:01.481030   47099 inboundnatrules.go:120]  "msg"="successfully deleted inbound NAT rule"  "NAT rule"="azure-md-0"
I0923 20:39:01.481045   47099 inboundnatrules.go:120]  "msg"="successfully deleted inbound NAT rule"  "NAT rule"="azure-md-1"
--- PASS: TestDeleteNetworkInterface (0.00s)
    --- PASS: TestDeleteNetworkInterface/NAT_rule_deletion_fails (0.00s)
    --- PASS: TestDeleteNetworkInterface/successfully_delete_an_existing_NAT_rule (0.00s)
    --- PASS: TestDeleteNetworkInterface/NAT_rule_already_deleted (0.00s)
=== RUN   TestNatRuleExists
=== RUN   TestNatRuleExists/Rule_exists
=== PAUSE TestNatRuleExists/Rule_exists
=== RUN   TestNatRuleExists/Rule_doesn't_exist
=== PAUSE TestNatRuleExists/Rule_doesn't_exist
=== RUN   TestNatRuleExists/No_rules_exist
=== PAUSE TestNatRuleExists/No_rules_exist
=== CONT  TestNatRuleExists/Rule_exists
=== CONT  TestNatRuleExists/No_rules_exist
=== CONT  TestNatRuleExists/Rule_doesn't_exist
I0923 20:39:01.481173   47099 inboundnatrules.go:129]  "msg"="NAT rule already exists"  "NAT rule"="my-rule"
--- PASS: TestNatRuleExists (0.00s)
    --- PASS: TestNatRuleExists/No_rules_exist (0.00s)
    --- PASS: TestNatRuleExists/Rule_exists (0.00s)
    --- PASS: TestNatRuleExists/Rule_doesn't_exist (0.00s)
=== RUN   TestGetAvailablePort
=== RUN   TestGetAvailablePort/Empty_ports
=== PAUSE TestGetAvailablePort/Empty_ports
=== RUN   TestGetAvailablePort/22_taken
=== PAUSE TestGetAvailablePort/22_taken
=== RUN   TestGetAvailablePort/Existing_ports
=== PAUSE TestGetAvailablePort/Existing_ports
=== RUN   TestGetAvailablePort/No_ports_available
=== PAUSE TestGetAvailablePort/No_ports_available
=== CONT  TestGetAvailablePort/Empty_ports
=== CONT  TestGetAvailablePort/Existing_ports
=== CONT  TestGetAvailablePort/No_ports_available
=== CONT  TestGetAvailablePort/22_taken
I0923 20:39:01.481306   47099 inboundnatrules.go:149]  "msg"="Found available port"  "port"=22
I0923 20:39:01.481317   47099 inboundnatrules.go:143]  "msg"="Found available port"  "port"=2203
I0923 20:39:01.481342   47099 inboundnatrules.go:143]  "msg"="Found available port"  "port"=2201
--- PASS: TestGetAvailablePort (0.00s)
    --- PASS: TestGetAvailablePort/Empty_ports (0.00s)
    --- PASS: TestGetAvailablePort/No_ports_available (0.00s)
    --- PASS: TestGetAvailablePort/Existing_ports (0.00s)
    --- PASS: TestGetAvailablePort/22_taken (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules	4.369s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/inboundnatrules/mock_inboundnatrules	[no test files]
=== RUN   TestReconcileLoadBalancer
=== RUN   TestReconcileLoadBalancer/fail_to_create_a_public_LB
=== PAUSE TestReconcileLoadBalancer/fail_to_create_a_public_LB
=== RUN   TestReconcileLoadBalancer/create_public_apiserver_LB
=== PAUSE TestReconcileLoadBalancer/create_public_apiserver_LB
=== RUN   TestReconcileLoadBalancer/create_internal_apiserver_LB
=== PAUSE TestReconcileLoadBalancer/create_internal_apiserver_LB
=== RUN   TestReconcileLoadBalancer/create_node_outbound_LB
=== PAUSE TestReconcileLoadBalancer/create_node_outbound_LB
=== RUN   TestReconcileLoadBalancer/create_multiple_LBs
=== PAUSE TestReconcileLoadBalancer/create_multiple_LBs
=== RUN   TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates
=== PAUSE TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates
=== RUN   TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties
=== PAUSE TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties
=== CONT  TestReconcileLoadBalancer/fail_to_create_a_public_LB
=== CONT  TestReconcileLoadBalancer/create_multiple_LBs
=== CONT  TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties
=== CONT  TestReconcileLoadBalancer/create_node_outbound_LB
=== CONT  TestReconcileLoadBalancer/create_public_apiserver_LB
=== CONT  TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates
=== CONT  TestReconcileLoadBalancer/create_internal_apiserver_LB
I0923 20:39:01.898478   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-publiclb"
I0923 20:39:01.898524   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-lb"
I0923 20:39:01.898534   47100 loadbalancers.go:86]  "msg"="found existing load balancer, checking if updates are needed"  "load balancer"="my-publiclb"
I0923 20:39:01.898546   47100 loadbalancers.go:86]  "msg"="found existing load balancer, checking if updates are needed"  "load balancer"="my-publiclb"
I0923 20:39:01.898796   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-lb"
I0923 20:39:01.898841   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-lb-2"
I0923 20:39:01.898536   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-cluster"
I0923 20:39:01.898570   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-publiclb"
I0923 20:39:01.898639   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-private-lb"
I0923 20:39:01.898865   47100 loadbalancers.go:135]  "msg"="LB exists and no defaults are missing, skipping update"  "load balancer"="my-publiclb"
I0923 20:39:01.898883   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-lb-2"
I0923 20:39:01.898901   47100 loadbalancers.go:139]  "msg"="creating load balancer"  "load balancer"="my-lb-3"
I0923 20:39:01.898933   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-lb-3"
I0923 20:39:01.899063   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-private-lb"
I0923 20:39:01.899087   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-cluster"
I0923 20:39:01.899088   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-publiclb"
I0923 20:39:01.899099   47100 loadbalancers.go:172]  "msg"="successfully created load balancer"  "load balancer"="my-publiclb"
--- PASS: TestReconcileLoadBalancer (0.00s)
    --- PASS: TestReconcileLoadBalancer/fail_to_create_a_public_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/LB_already_exists_and_needs_no_updates (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_multiple_LBs (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_internal_apiserver_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_node_outbound_LB (0.00s)
    --- PASS: TestReconcileLoadBalancer/LB_already_exists_and_is_missing_properties (0.00s)
    --- PASS: TestReconcileLoadBalancer/create_public_apiserver_LB (0.00s)
=== RUN   TestDeleteLoadBalancer
=== RUN   TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer
=== PAUSE TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer
=== RUN   TestDeleteLoadBalancer/load_balancer_already_deleted
=== PAUSE TestDeleteLoadBalancer/load_balancer_already_deleted
=== RUN   TestDeleteLoadBalancer/load_balancer_deletion_fails
=== PAUSE TestDeleteLoadBalancer/load_balancer_deletion_fails
=== CONT  TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer
=== CONT  TestDeleteLoadBalancer/load_balancer_deletion_fails
=== CONT  TestDeleteLoadBalancer/load_balancer_already_deleted
I0923 20:39:01.899258   47100 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-internallb"
I0923 20:39:01.899266   47100 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-publiclb"
I0923 20:39:01.899271   47100 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-publiclb"
I0923 20:39:01.899278   47100 loadbalancers.go:193]  "msg"="deleted public load balancer"  "load balancer"="my-internallb"
I0923 20:39:01.899293   47100 loadbalancers.go:183]  "msg"="deleting load balancer"  "load balancer"="my-publiclb"
I0923 20:39:01.899306   47100 loadbalancers.go:193]  "msg"="deleted public load balancer"  "load balancer"="my-publiclb"
--- PASS: TestDeleteLoadBalancer (0.00s)
    --- PASS: TestDeleteLoadBalancer/load_balancer_already_deleted (0.00s)
    --- PASS: TestDeleteLoadBalancer/load_balancer_deletion_fails (0.00s)
    --- PASS: TestDeleteLoadBalancer/successfully_delete_an_existing_load_balancer (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers	4.748s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/loadbalancers/mock_loadbalancers	[no test files]
=== RUN   TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Canceled
=== RUN   TestReconcile/managedcluster_in_terminal_provisioning_state
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Succeeded
=== RUN   TestReconcile/managedcluster_in_terminal_provisioning_state#01
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Failed
=== RUN   TestReconcile/managedcluster_in_terminal_provisioning_state#02
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: Deleting
=== RUN   TestReconcile/managedcluster_in_nonterminal_provisioning_state
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: InProgress
=== RUN   TestReconcile/managedcluster_in_nonterminal_provisioning_state#01
=== CONT  TestReconcile
    managedclusters_test.go:86: Testing managedcluster provision state: randomStringHere
=== RUN   TestReconcile/managedcluster_in_nonterminal_provisioning_state#02
=== CONT  TestReconcile
    managedclusters_test.go:146: Testing no managedcluster exists
=== RUN   TestReconcile/no_managedcluster_exists
--- PASS: TestReconcile (0.00s)
    --- PASS: TestReconcile/managedcluster_in_terminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/managedcluster_in_terminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/managedcluster_in_terminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/managedcluster_in_nonterminal_provisioning_state (0.00s)
    --- PASS: TestReconcile/managedcluster_in_nonterminal_provisioning_state#01 (0.00s)
    --- PASS: TestReconcile/managedcluster_in_nonterminal_provisioning_state#02 (0.00s)
    --- PASS: TestReconcile/no_managedcluster_exists (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters	5.484s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/managedclusters/mock_managedclusters	[no test files]
=== RUN   TestReconcileNatGateways
=== RUN   TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode
=== PAUSE TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode
=== RUN   TestReconcileNatGateways/nat_gateway_create_successfully
=== PAUSE TestReconcileNatGateways/nat_gateway_create_successfully
=== RUN   TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state
=== PAUSE TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state
=== RUN   TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date
=== PAUSE TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date
=== RUN   TestReconcileNatGateways/fail_when_getting_existing_nat_gateway
=== PAUSE TestReconcileNatGateways/fail_when_getting_existing_nat_gateway
=== RUN   TestReconcileNatGateways/fail_to_create_a_nat_gateway
=== PAUSE TestReconcileNatGateways/fail_to_create_a_nat_gateway
=== CONT  TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode
=== CONT  TestReconcileNatGateways/fail_when_getting_existing_nat_gateway
=== CONT  TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state
=== CONT  TestReconcileNatGateways/fail_to_create_a_nat_gateway
=== CONT  TestReconcileNatGateways/nat_gateway_create_successfully
=== CONT  TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date
I0923 20:39:02.320021   47101 natgateways.go:62]  "msg"="Skipping nat gateways reconcile in custom vnet mode"
I0923 20:39:02.320219   47101 natgateways.go:74]  "msg"="nat gateway already exists"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.320281   47101 natgateways.go:79]  "msg"="Nat Gateway exists with expected values, skipping update"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.320080   47101 natgateways.go:74]  "msg"="nat gateway already exists"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.320304   47101 natgateways.go:84]  "msg"="updating NAT gateway IP name to match the spec"  "desired name"="different-pip-name" "old name"="pip-my-node-natgateway-node-subnet-natgw"
I0923 20:39:02.320125   47101 natgateways.go:88]  "msg"="nat gateway doesn't exist yet, creating it"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.320091   47101 natgateways.go:88]  "msg"="nat gateway doesn't exist yet, creating it"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.320370   47101 natgateways.go:106]  "msg"="successfully created nat gateway"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.320392   47101 natgateways.go:106]  "msg"="successfully created nat gateway"  "nat gateway"="my-node-natgateway"
--- PASS: TestReconcileNatGateways (0.00s)
    --- PASS: TestReconcileNatGateways/fail_when_getting_existing_nat_gateway (0.00s)
    --- PASS: TestReconcileNatGateways/nat_gateways_in_custom_vnet_mode (0.00s)
    --- PASS: TestReconcileNatGateways/nat_gateway_is_not_updated_if_it's_up_to_date (0.00s)
    --- PASS: TestReconcileNatGateways/update_nat_gateway_if_actual_state_does_not_match_desired_state (0.00s)
    --- PASS: TestReconcileNatGateways/fail_to_create_a_nat_gateway (0.00s)
    --- PASS: TestReconcileNatGateways/nat_gateway_create_successfully (0.00s)
=== RUN   TestDeleteNatGateway
=== RUN   TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode
=== PAUSE TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode
=== RUN   TestDeleteNatGateway/nat_gateway_deleted_successfully
=== PAUSE TestDeleteNatGateway/nat_gateway_deleted_successfully
=== RUN   TestDeleteNatGateway/nat_gateway_already_deleted
=== PAUSE TestDeleteNatGateway/nat_gateway_already_deleted
=== RUN   TestDeleteNatGateway/nat_gateway_deletion_fails
=== PAUSE TestDeleteNatGateway/nat_gateway_deletion_fails
=== CONT  TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode
=== CONT  TestDeleteNatGateway/nat_gateway_deletion_fails
=== CONT  TestDeleteNatGateway/nat_gateway_deleted_successfully
=== CONT  TestDeleteNatGateway/nat_gateway_already_deleted
I0923 20:39:02.321100   47101 natgateways.go:156]  "msg"="Skipping nat gateway deletion in custom vnet mode"
I0923 20:39:02.321128   47101 natgateways.go:160]  "msg"="deleting nat gateway"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.321138   47101 natgateways.go:160]  "msg"="deleting nat gateway"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.321150   47101 natgateways.go:160]  "msg"="deleting nat gateway"  "nat gateway"="my-node-natgateway"
I0923 20:39:02.321159   47101 natgateways.go:170]  "msg"="successfully deleted nat gateway"  "nat gateway"="my-node-natgateway"
--- PASS: TestDeleteNatGateway (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateways_in_custom_vnet_mode (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateway_deletion_fails (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateway_already_deleted (0.00s)
    --- PASS: TestDeleteNatGateway/nat_gateway_deleted_successfully (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways	5.073s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/natgateways/mock_natgateways	[no test files]
=== RUN   TestReconcileNetworkInterface
=== RUN   TestReconcileNetworkInterface/network_interface_already_exists
=== PAUSE TestReconcileNetworkInterface/network_interface_already_exists
=== RUN   TestReconcileNetworkInterface/node_network_interface_create_fails
=== PAUSE TestReconcileNetworkInterface/node_network_interface_create_fails
=== RUN   TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created
=== PAUSE TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created
=== RUN   TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created
=== PAUSE TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created
=== RUN   TestReconcileNetworkInterface/control_plane_network_interface_successfully_created
=== PAUSE TestReconcileNetworkInterface/control_plane_network_interface_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created
=== PAUSE TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created
=== PAUSE TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created
=== PAUSE TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created
=== RUN   TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully
=== PAUSE TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully
=== CONT  TestReconcileNetworkInterface/network_interface_already_exists
=== CONT  TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created
=== CONT  TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created
=== CONT  TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created
=== CONT  TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created
=== CONT  TestReconcileNetworkInterface/node_network_interface_create_fails
=== CONT  TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created
=== CONT  TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully
=== CONT  TestReconcileNetworkInterface/control_plane_network_interface_successfully_created
I0923 20:39:03.170974   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-public-net-interface"
I0923 20:39:03.171289   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0923 20:39:03.171178   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0923 20:39:03.171182   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0923 20:39:03.171333   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0923 20:39:03.171246   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
I0923 20:39:03.171396   47103 networkinterfaces.go:158]  "msg"="successfully created network interface"  "network interface"="my-net-interface"
--- PASS: TestReconcileNetworkInterface (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_already_exists (0.00s)
    --- PASS: TestReconcileNetworkInterface/node_network_interface_create_fails (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_with_Public_IP_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/node_network_interface_with_Static_private_IP_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_with_accelerated_networking_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_without_accelerated_networking_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/control_plane_network_interface_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/node_network_interface_with_Dynamic_private_IP_successfully_created (0.00s)
    --- PASS: TestReconcileNetworkInterface/network_interface_with_ipv6_created_successfully (0.00s)
=== RUN   TestDeleteNetworkInterface
=== RUN   TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface
=== PAUSE TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface
=== RUN   TestDeleteNetworkInterface/network_interface_already_deleted
=== PAUSE TestDeleteNetworkInterface/network_interface_already_deleted
=== RUN   TestDeleteNetworkInterface/network_interface_deletion_fails
=== PAUSE TestDeleteNetworkInterface/network_interface_deletion_fails
=== CONT  TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface
=== CONT  TestDeleteNetworkInterface/network_interface_deletion_fails
=== CONT  TestDeleteNetworkInterface/network_interface_already_deleted
I0923 20:39:03.171673   47103 networkinterfaces.go:170]  "msg"="deleting network interface %s"  "network interface"="my-net-interface"
I0923 20:39:03.171682   47103 networkinterfaces.go:170]  "msg"="deleting network interface %s"  "network interface"="my-net-interface"
I0923 20:39:03.171686   47103 networkinterfaces.go:170]  "msg"="deleting network interface %s"  "network interface"="my-net-interface"
I0923 20:39:03.171703   47103 networkinterfaces.go:175]  "msg"="successfully deleted NIC"  "network interface"="my-net-interface"
I0923 20:39:03.171711   47103 networkinterfaces.go:175]  "msg"="successfully deleted NIC"  "network interface"="my-net-interface"
--- PASS: TestDeleteNetworkInterface (0.00s)
    --- PASS: TestDeleteNetworkInterface/successfully_delete_an_existing_network_interface (0.00s)
    --- PASS: TestDeleteNetworkInterface/network_interface_already_deleted (0.00s)
    --- PASS: TestDeleteNetworkInterface/network_interface_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces	5.865s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/networkinterfaces/mock_networkinterfaces	[no test files]
=== RUN   TestReconcilePrivateDNS
=== RUN   TestReconcilePrivateDNS/no_private_dns
=== PAUSE TestReconcilePrivateDNS/no_private_dns
=== RUN   TestReconcilePrivateDNS/create_ipv4_private_dns_successfully
=== PAUSE TestReconcilePrivateDNS/create_ipv4_private_dns_successfully
=== RUN   TestReconcilePrivateDNS/create_ipv6_private_dns_successfully
=== PAUSE TestReconcilePrivateDNS/create_ipv6_private_dns_successfully
=== RUN   TestReconcilePrivateDNS/link_creation_fails
=== PAUSE TestReconcilePrivateDNS/link_creation_fails
=== CONT  TestReconcilePrivateDNS/no_private_dns
=== CONT  TestReconcilePrivateDNS/create_ipv6_private_dns_successfully
=== CONT  TestReconcilePrivateDNS/create_ipv4_private_dns_successfully
=== CONT  TestReconcilePrivateDNS/link_creation_fails
I0923 20:39:03.608061   47108 privatedns.go:61]  "msg"="creating private DNS zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608064   47108 privatedns.go:61]  "msg"="creating private DNS zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608298   47108 privatedns.go:66]  "msg"="successfully created private DNS zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608122   47108 privatedns.go:61]  "msg"="creating private DNS zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608308   47108 privatedns.go:66]  "msg"="successfully created private DNS zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608316   47108 privatedns.go:69]  "msg"="creating a virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608326   47108 privatedns.go:69]  "msg"="creating a virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608339   47108 privatedns.go:83]  "msg"="successfully created virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608345   47108 privatedns.go:66]  "msg"="successfully created private DNS zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608352   47108 privatedns.go:87]  "msg"="creating record set"  "private dns zone"="my-dns-zone" "record"="hostname-2"
I0923 20:39:03.608360   47108 privatedns.go:69]  "msg"="creating a virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608364   47108 privatedns.go:83]  "msg"="successfully created virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608373   47108 privatedns.go:107]  "msg"="successfully created record set"  "private dns zone"="my-dns-zone" "record"="hostname-2"
I0923 20:39:03.608383   47108 privatedns.go:87]  "msg"="creating record set"  "private dns zone"="my-dns-zone" "record"="hostname-1"
I0923 20:39:03.608416   47108 privatedns.go:107]  "msg"="successfully created record set"  "private dns zone"="my-dns-zone" "record"="hostname-1"
--- PASS: TestReconcilePrivateDNS (0.00s)
    --- PASS: TestReconcilePrivateDNS/no_private_dns (0.00s)
    --- PASS: TestReconcilePrivateDNS/create_ipv6_private_dns_successfully (0.00s)
    --- PASS: TestReconcilePrivateDNS/link_creation_fails (0.00s)
    --- PASS: TestReconcilePrivateDNS/create_ipv4_private_dns_successfully (0.00s)
=== RUN   TestDeletePrivateDNS
=== RUN   TestDeletePrivateDNS/no_private_dns
=== PAUSE TestDeletePrivateDNS/no_private_dns
=== RUN   TestDeletePrivateDNS/delete_the_dns_zone
=== PAUSE TestDeletePrivateDNS/delete_the_dns_zone
=== RUN   TestDeletePrivateDNS/link_already_deleted
=== PAUSE TestDeletePrivateDNS/link_already_deleted
=== RUN   TestDeletePrivateDNS/zone_already_deleted
=== PAUSE TestDeletePrivateDNS/zone_already_deleted
=== RUN   TestDeletePrivateDNS/error_while_trying_to_delete_the_link
=== PAUSE TestDeletePrivateDNS/error_while_trying_to_delete_the_link
=== RUN   TestDeletePrivateDNS/error_while_trying_to_delete_the_zone
=== PAUSE TestDeletePrivateDNS/error_while_trying_to_delete_the_zone
=== CONT  TestDeletePrivateDNS/no_private_dns
=== CONT  TestDeletePrivateDNS/zone_already_deleted
=== CONT  TestDeletePrivateDNS/link_already_deleted
=== CONT  TestDeletePrivateDNS/error_while_trying_to_delete_the_zone
=== CONT  TestDeletePrivateDNS/delete_the_dns_zone
=== CONT  TestDeletePrivateDNS/error_while_trying_to_delete_the_link
I0923 20:39:03.608698   47108 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608706   47108 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608717   47108 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608726   47108 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608741   47108 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608747   47108 privatedns.go:137]  "msg"="successfully deleted private dns zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608745   47108 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608758   47108 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608779   47108 privatedns.go:137]  "msg"="successfully deleted private dns zone"  "private dns zone"="my-dns-zone"
I0923 20:39:03.608812   47108 privatedns.go:121]  "msg"="removing virtual network link"  "private dns zone"="my-dns-zone" "virtual network"="my-vnet"
I0923 20:39:03.608835   47108 privatedns.go:128]  "msg"="deleting private dns zone"  "private dns zone"="my-dns-zone"
--- PASS: TestDeletePrivateDNS (0.00s)
    --- PASS: TestDeletePrivateDNS/no_private_dns (0.00s)
    --- PASS: TestDeletePrivateDNS/link_already_deleted (0.00s)
    --- PASS: TestDeletePrivateDNS/zone_already_deleted (0.00s)
    --- PASS: TestDeletePrivateDNS/delete_the_dns_zone (0.00s)
    --- PASS: TestDeletePrivateDNS/error_while_trying_to_delete_the_link (0.00s)
    --- PASS: TestDeletePrivateDNS/error_while_trying_to_delete_the_zone (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns	5.898s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/privatedns/mock_privatedns	[no test files]
=== RUN   TestReconcilePublicIP
=== RUN   TestReconcilePublicIP/can_create_public_IPs
=== PAUSE TestReconcilePublicIP/can_create_public_IPs
=== RUN   TestReconcilePublicIP/fail_to_create_a_public_IP
=== PAUSE TestReconcilePublicIP/fail_to_create_a_public_IP
=== CONT  TestReconcilePublicIP/can_create_public_IPs
=== CONT  TestReconcilePublicIP/fail_to_create_a_public_IP
I0923 20:39:04.110099   47110 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip"
I0923 20:39:04.110113   47110 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip"
I0923 20:39:04.110572   47110 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip"
I0923 20:39:04.110591   47110 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.110693   47110 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.110713   47110 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip-3"
I0923 20:39:04.110785   47110 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip-3"
I0923 20:39:04.110804   47110 publicips.go:61]  "msg"="creating public IP"  "public ip"="my-publicip-ipv6"
I0923 20:39:04.110867   47110 publicips.go:104]  "msg"="successfully created public IP"  "public ip"="my-publicip-ipv6"
--- PASS: TestReconcilePublicIP (0.00s)
    --- PASS: TestReconcilePublicIP/fail_to_create_a_public_IP (0.00s)
    --- PASS: TestReconcilePublicIP/can_create_public_IPs (0.00s)
=== RUN   TestDeletePublicIP
=== RUN   TestDeletePublicIP/successfully_delete_two_existing_public_IP
=== PAUSE TestDeletePublicIP/successfully_delete_two_existing_public_IP
=== RUN   TestDeletePublicIP/public_ip_already_deleted
=== PAUSE TestDeletePublicIP/public_ip_already_deleted
=== RUN   TestDeletePublicIP/public_ip_deletion_fails
=== PAUSE TestDeletePublicIP/public_ip_deletion_fails
=== RUN   TestDeletePublicIP/skip_unmanaged_public_ip_deletion
=== PAUSE TestDeletePublicIP/skip_unmanaged_public_ip_deletion
=== CONT  TestDeletePublicIP/successfully_delete_two_existing_public_IP
=== CONT  TestDeletePublicIP/public_ip_deletion_fails
=== CONT  TestDeletePublicIP/public_ip_already_deleted
=== CONT  TestDeletePublicIP/skip_unmanaged_public_ip_deletion
I0923 20:39:04.111160   47110 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip"
I0923 20:39:04.111163   47110 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip"
I0923 20:39:04.111190   47110 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip"
I0923 20:39:04.111214   47110 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.111233   47110 publicips.go:122]  "msg"="Skipping IP deletion for unmanaged public IP"  "public ip"="my-publicip"
I0923 20:39:04.111236   47110 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.111264   47110 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.111264   47110 publicips.go:122]  "msg"="Skipping IP deletion for unmanaged public IP"  "public ip"="my-publicip"
I0923 20:39:04.111283   47110 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.111296   47110 publicips.go:126]  "msg"="deleting public IP"  "public ip"="my-publicip-2"
I0923 20:39:04.111320   47110 publicips.go:136]  "msg"="deleted public IP"  "public ip"="my-publicip-2"
--- PASS: TestDeletePublicIP (0.00s)
    --- PASS: TestDeletePublicIP/public_ip_deletion_fails (0.00s)
    --- PASS: TestDeletePublicIP/successfully_delete_two_existing_public_IP (0.00s)
    --- PASS: TestDeletePublicIP/public_ip_already_deleted (0.00s)
    --- PASS: TestDeletePublicIP/skip_unmanaged_public_ip_deletion (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips	6.269s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/publicips/mock_publicips	[no test files]
=== RUN   TestCacheGet
=== RUN   TestCacheGet/should_find
=== PAUSE TestCacheGet/should_find
=== RUN   TestCacheGet/should_not_find
=== PAUSE TestCacheGet/should_not_find
=== CONT  TestCacheGet/should_find
=== CONT  TestCacheGet/should_not_find
--- PASS: TestCacheGet (0.00s)
    --- PASS: TestCacheGet/should_find (0.00s)
    --- PASS: TestCacheGet/should_not_find (0.00s)
=== RUN   TestCacheGetZones
=== RUN   TestCacheGetZones/should_find_1_result
=== PAUSE TestCacheGetZones/should_find_1_result
=== RUN   TestCacheGetZones/should_find_2_results
=== PAUSE TestCacheGetZones/should_find_2_results
=== RUN   TestCacheGetZones/should_not_find_due_to_location_mismatch
=== PAUSE TestCacheGetZones/should_not_find_due_to_location_mismatch
=== RUN   TestCacheGetZones/should_not_find_due_to_location_restriction
=== PAUSE TestCacheGetZones/should_not_find_due_to_location_restriction
=== RUN   TestCacheGetZones/should_not_find_due_to_zone_restriction
=== PAUSE TestCacheGetZones/should_not_find_due_to_zone_restriction
=== CONT  TestCacheGetZones/should_find_1_result
=== CONT  TestCacheGetZones/should_not_find_due_to_location_restriction
=== CONT  TestCacheGetZones/should_not_find_due_to_location_mismatch
=== CONT  TestCacheGetZones/should_not_find_due_to_zone_restriction
=== CONT  TestCacheGetZones/should_find_2_results
--- PASS: TestCacheGetZones (0.00s)
    --- PASS: TestCacheGetZones/should_not_find_due_to_zone_restriction (0.00s)
    --- PASS: TestCacheGetZones/should_not_find_due_to_location_mismatch (0.00s)
    --- PASS: TestCacheGetZones/should_not_find_due_to_location_restriction (0.00s)
    --- PASS: TestCacheGetZones/should_find_1_result (0.00s)
    --- PASS: TestCacheGetZones/should_find_2_results (0.00s)
=== RUN   TestCacheGetZonesWithVMSize
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction
=== RUN   TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction
=== PAUSE TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction
=== RUN   TestCacheGetZonesWithVMSize/should_find_1_result
=== PAUSE TestCacheGetZonesWithVMSize/should_find_1_result
=== RUN   TestCacheGetZonesWithVMSize/should_find_2_results
=== PAUSE TestCacheGetZonesWithVMSize/should_find_2_results
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch
=== CONT  TestCacheGetZonesWithVMSize/should_find_2_results
=== CONT  TestCacheGetZonesWithVMSize/should_find_1_result
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction
=== CONT  TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch
--- PASS: TestCacheGetZonesWithVMSize (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_size_mismatch (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_find_2_results (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_find_1_result (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_zone_restriction (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_location_restriction (0.00s)
    --- PASS: TestCacheGetZonesWithVMSize/should_not_find_due_to_location_mismatch (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus	6.516s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/resourceskus/mock_resourceskus	[no test files]
=== RUN   TestReconcileRoleAssignmentsVM
=== RUN   TestReconcileRoleAssignmentsVM/create_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVM/create_a_role_assignment
=== RUN   TestReconcileRoleAssignmentsVM/error_getting_VM
=== PAUSE TestReconcileRoleAssignmentsVM/error_getting_VM
=== RUN   TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVM/create_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVM/error_getting_VM
I0923 20:39:05.026596   47125 roleassignments.go:94]  "msg"="successfully created role assignment for generated Identity for VM"  "virtual machine"="test-vm"
--- PASS: TestReconcileRoleAssignmentsVM (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVM/error_getting_VM (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVM/return_error_when_creating_a_role_assignment (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVM/create_a_role_assignment (0.00s)
=== RUN   TestReconcileRoleAssignmentsVMSS
=== RUN   TestReconcileRoleAssignmentsVMSS/create_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVMSS/create_a_role_assignment
=== RUN   TestReconcileRoleAssignmentsVMSS/error_getting_VMSS
=== PAUSE TestReconcileRoleAssignmentsVMSS/error_getting_VMSS
=== RUN   TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment
=== PAUSE TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVMSS/create_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment
=== CONT  TestReconcileRoleAssignmentsVMSS/error_getting_VMSS
I0923 20:39:05.027020   47125 roleassignments.go:113]  "msg"="successfully created role assignment for generated Identity for VMSS"  "virtual machine scale set"="test-vmss"
--- PASS: TestReconcileRoleAssignmentsVMSS (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVMSS/error_getting_VMSS (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVMSS/return_error_when_creating_a_role_assignment (0.00s)
    --- PASS: TestReconcileRoleAssignmentsVMSS/create_a_role_assignment (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments	5.935s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/roleassignments/mock_roleassignments	[no test files]
=== RUN   TestReconcileRouteTables
=== RUN   TestReconcileRouteTables/route_tables_in_custom_vnet_mode
=== PAUSE TestReconcileRouteTables/route_tables_in_custom_vnet_mode
=== RUN   TestReconcileRouteTables/route_table_create_successfully
=== PAUSE TestReconcileRouteTables/route_table_create_successfully
=== RUN   TestReconcileRouteTables/do_not_create_route_table_if_already_exists
=== PAUSE TestReconcileRouteTables/do_not_create_route_table_if_already_exists
=== RUN   TestReconcileRouteTables/fail_when_getting_existing_route_table
=== PAUSE TestReconcileRouteTables/fail_when_getting_existing_route_table
=== RUN   TestReconcileRouteTables/fail_to_create_a_route_table
=== PAUSE TestReconcileRouteTables/fail_to_create_a_route_table
=== CONT  TestReconcileRouteTables/route_tables_in_custom_vnet_mode
=== CONT  TestReconcileRouteTables/fail_when_getting_existing_route_table
=== CONT  TestReconcileRouteTables/do_not_create_route_table_if_already_exists
=== CONT  TestReconcileRouteTables/route_table_create_successfully
=== CONT  TestReconcileRouteTables/fail_to_create_a_route_table
I0923 20:39:05.528672   47128 routetables.go:60]  "msg"="Skipping route tables reconcile in custom vnet mode"
I0923 20:39:05.528772   47128 routetables.go:80]  "msg"="creating Route Table"  "route table"="my-cp-routetable"
I0923 20:39:05.528781   47128 routetables.go:80]  "msg"="creating Route Table"  "route table"="my-cp-routetable"
I0923 20:39:05.528923   47128 routetables.go:93]  "msg"="successfully created route table"  "route table"="my-cp-routetable"
I0923 20:39:05.528951   47128 routetables.go:80]  "msg"="creating Route Table"  "route table"="my-node-routetable"
I0923 20:39:05.528977   47128 routetables.go:93]  "msg"="successfully created route table"  "route table"="my-node-routetable"
--- PASS: TestReconcileRouteTables (0.00s)
    --- PASS: TestReconcileRouteTables/fail_when_getting_existing_route_table (0.00s)
    --- PASS: TestReconcileRouteTables/do_not_create_route_table_if_already_exists (0.00s)
    --- PASS: TestReconcileRouteTables/route_tables_in_custom_vnet_mode (0.00s)
    --- PASS: TestReconcileRouteTables/fail_to_create_a_route_table (0.00s)
    --- PASS: TestReconcileRouteTables/route_table_create_successfully (0.00s)
=== RUN   TestDeleteRouteTable
=== RUN   TestDeleteRouteTable/route_tables_in_custom_vnet_mode
=== PAUSE TestDeleteRouteTable/route_tables_in_custom_vnet_mode
=== RUN   TestDeleteRouteTable/route_table_deleted_successfully
=== PAUSE TestDeleteRouteTable/route_table_deleted_successfully
=== RUN   TestDeleteRouteTable/route_table_already_deleted
=== PAUSE TestDeleteRouteTable/route_table_already_deleted
=== RUN   TestDeleteRouteTable/route_table_deletion_fails
=== PAUSE TestDeleteRouteTable/route_table_deletion_fails
=== CONT  TestDeleteRouteTable/route_tables_in_custom_vnet_mode
=== CONT  TestDeleteRouteTable/route_table_already_deleted
=== CONT  TestDeleteRouteTable/route_table_deleted_successfully
=== CONT  TestDeleteRouteTable/route_table_deletion_fails
I0923 20:39:05.529242   47128 routetables.go:104]  "msg"="Skipping route table deletion in custom vnet mode"
I0923 20:39:05.529307   47128 routetables.go:108]  "msg"="deleting route table"  "route table"="my-cp-routetable"
I0923 20:39:05.529308   47128 routetables.go:108]  "msg"="deleting route table"  "route table"="my-cp-routetable"
I0923 20:39:05.529323   47128 routetables.go:108]  "msg"="deleting route table"  "route table"="my-cp-routetable"
I0923 20:39:05.529332   47128 routetables.go:118]  "msg"="successfully deleted route table"  "route table"="my-cp-routetable"
I0923 20:39:05.529338   47128 routetables.go:108]  "msg"="deleting route table"  "route table"="my-node-routetable"
I0923 20:39:05.529346   47128 routetables.go:108]  "msg"="deleting route table"  "route table"="my-node-routetable"
I0923 20:39:05.529366   47128 routetables.go:118]  "msg"="successfully deleted route table"  "route table"="my-node-routetable"
--- PASS: TestDeleteRouteTable (0.00s)
    --- PASS: TestDeleteRouteTable/route_tables_in_custom_vnet_mode (0.00s)
    --- PASS: TestDeleteRouteTable/route_table_already_deleted (0.00s)
    --- PASS: TestDeleteRouteTable/route_table_deletion_fails (0.00s)
    --- PASS: TestDeleteRouteTable/route_table_deleted_successfully (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables	6.093s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/routetables/mock_routetables	[no test files]
=== RUN   TestNewService
--- PASS: TestNewService (0.00s)
=== RUN   TestGetExistingVMSS
=== RUN   TestGetExistingVMSS/scale_set_not_found
=== PAUSE TestGetExistingVMSS/scale_set_not_found
=== RUN   TestGetExistingVMSS/get_existing_vmss
=== PAUSE TestGetExistingVMSS/get_existing_vmss
=== RUN   TestGetExistingVMSS/list_instances_fails
=== PAUSE TestGetExistingVMSS/list_instances_fails
=== CONT  TestGetExistingVMSS/scale_set_not_found
=== CONT  TestGetExistingVMSS/get_existing_vmss
=== CONT  TestGetExistingVMSS/list_instances_fails
=== CONT  TestGetExistingVMSS/scale_set_not_found
    scalesets_test.go:215: failed to get existing vmss: #: Not found: StatusCode=404
=== CONT  TestGetExistingVMSS/list_instances_fails
    scalesets_test.go:215: failed to list instances: #: Not found: StatusCode=404
--- PASS: TestGetExistingVMSS (0.00s)
    --- PASS: TestGetExistingVMSS/get_existing_vmss (0.00s)
    --- PASS: TestGetExistingVMSS/scale_set_not_found (0.00s)
    --- PASS: TestGetExistingVMSS/list_instances_fails (0.00s)
=== RUN   TestReconcileVMSS
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss
=== RUN   TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done
=== PAUSE TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done
=== RUN   TestReconcileVMSS/Windows_VMSS_should_not_get_patched
=== PAUSE TestReconcileVMSS/Windows_VMSS_should_not_get_patched
=== RUN   TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows
=== PAUSE TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_encryption
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_encryption
=== RUN   TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity
=== PAUSE TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity
=== RUN   TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled
=== PAUSE TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled
=== RUN   TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== PAUSE TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== RUN   TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation
=== PAUSE TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation
=== RUN   TestReconcileVMSS/less_than_2_vCPUs
=== PAUSE TestReconcileVMSS/less_than_2_vCPUs
=== RUN   TestReconcileVMSS/Memory_is_less_than_2Gi
=== PAUSE TestReconcileVMSS/Memory_is_less_than_2Gi
=== RUN   TestReconcileVMSS/failed_to_get_SKU
=== PAUSE TestReconcileVMSS/failed_to_get_SKU
=== RUN   TestReconcileVMSS/fails_with_internal_error
=== PAUSE TestReconcileVMSS/fails_with_internal_error
=== RUN   TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled
=== PAUSE TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled
=== CONT  TestReconcileVMSS/Memory_is_less_than_2Gi
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm
=== CONT  TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation
=== CONT  TestReconcileVMSS/fails_with_internal_error
=== CONT  TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_encryption
=== CONT  TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity
=== CONT  TestReconcileVMSS/failed_to_get_SKU
=== CONT  TestReconcileVMSS/Windows_VMSS_should_not_get_patched
=== CONT  TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows
=== CONT  TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done
=== CONT  TestReconcileVMSS/less_than_2_vCPUs
=== CONT  TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== CONT  TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price
I0923 20:39:06.073677   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.074104   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.073677   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.074441   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.073978   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.073718   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.074062   47130 scalesets.go:226]  "msg"="starting to create VMSS"  "scale set"="my-vmss"
I0923 20:39:06.075034   47130 scalesets.go:263]  "msg"="nothing to update on vmss"  "hasChanges"=false "newReplicas"=2 "oldReplicas"=2 "scale set"="my-vmss"
I0923 20:39:06.075039   47130 scalesets.go:263]  "msg"="nothing to update on vmss"  "hasChanges"=false "newReplicas"=2 "oldReplicas"=2 "scale set"="my-vmss"
I0923 20:39:06.075794   47130 scalesets.go:256]  "msg"="surging..."  "surge"=3
I0923 20:39:06.075892   47130 scalesets.go:267]  "msg"="patching vmss"  "patch"={"properties":{"upgradePolicy":{"mode":"Manual"},"virtualMachineProfile":{"osProfile":{"customData":"fake-bootstrap-data","linuxConfiguration":{"disablePasswordAuthentication":true,"ssh":{"publicKeys":[{"path":"/home/capi/.ssh/authorized_keys","keyData":"fakesshkey\n"}]}}},"storageProfile":{"imageReference":{"offer":"my-offer","publisher":"fake-publisher","sku":"sku-id","version":"2.0"},"osDisk":{"diskSizeGB":120,"managedDisk":{"storageAccountType":"Premium_LRS"}},"dataDisks":[{"name":"my-vmss_my_disk","lun":0,"createOption":"Empty","diskSizeGB":128},{"name":"my-vmss_my_disk_with_managed_disk","lun":1,"createOption":"Empty","diskSizeGB":128,"managedDisk":{"storageAccountType":"Standard_LRS"}},{"name":"my-vmss_managed_disk_with_encryption","lun":2,"createOption":"Empty","diskSizeGB":128,"managedDisk":{"storageAccountType":"Standard_LRS","diskEncryptionSet":{"id":"encryption_id"}}},{"name":"my-vmss_my_disk_with_ultra_disks","lun":3,"createOption":"Empty","diskSizeGB":128,"managedDisk":{"storageAccountType":"UltraSSD_LRS"}}]},"diagnosticsProfile":{"bootDiagnostics":{"enabled":true}},"extensionProfile":{"extensions":[{"name":"someExtension","properties":{"protectedSettings":{"commandToExecute":"echo hello"},"publisher":"somePublisher","type":"someExtension","typeHandlerVersion":"someVersion"}}]},"scheduledEventsProfile":{"terminateNotificationProfile":{"notBeforeTimeout":"PT7M","enable":true}}},"overprovision":false,"singlePlacementGroup":false,"additionalCapabilities":{"ultraSSDEnabled":true}},"sku":{"name":"VM_SIZE","tier":"Standard","capacity":3},"tags":{"Name":"my-vmss","sigs.k8s.io_cluster-api-provider-azure_cluster_my-cluster":"owned","sigs.k8s.io_cluster-api-provider-azure_role":"node"}} "scale set"="my-vmss"
I0923 20:39:06.076096   47130 scalesets.go:277]  "msg"="successfully started to update vmss"  "scale set"="my-vmss"
--- PASS: TestReconcileVMSS (0.00s)
    --- PASS: TestReconcileVMSS/Memory_is_less_than_2Gi (0.00s)
    --- PASS: TestReconcileVMSS/fail_to_create_a_vm_with_ultra_disk_enabled (0.00s)
    --- PASS: TestReconcileVMSS/fails_with_internal_error (0.00s)
    --- PASS: TestReconcileVMSS/failed_to_get_SKU (0.00s)
    --- PASS: TestReconcileVMSS/creating_a_vmss_with_encryption_at_host_enabled_for_unsupported_VM_type_fails (0.00s)
    --- PASS: TestReconcileVMSS/less_than_2_vCPUs (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_encryption_at_host_enabled (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_vmss_with_defaulted_accelerated_networking_when_size_allows (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm_and_a_maximum_price (0.00s)
    --- PASS: TestReconcileVMSS/can_start_creating_a_vmss_with_user_assigned_identity (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_spot_vm (0.00s)
    --- PASS: TestReconcileVMSS/should_start_creating_a_vmss_with_encryption (0.00s)
    --- PASS: TestReconcileVMSS/Windows_VMSS_should_not_get_patched (0.00s)
    --- PASS: TestReconcileVMSS/should_finish_creating_a_vmss_when_long_running_operation_is_done (0.00s)
    --- PASS: TestReconcileVMSS/should_start_updating_when_scale_set_already_exists_and_not_currently_in_a_long_running_operation (0.01s)
=== RUN   TestDeleteVMSS
=== RUN   TestDeleteVMSS/successfully_delete_an_existing_vmss
=== PAUSE TestDeleteVMSS/successfully_delete_an_existing_vmss
=== RUN   TestDeleteVMSS/vmss_already_deleted
=== PAUSE TestDeleteVMSS/vmss_already_deleted
=== RUN   TestDeleteVMSS/vmss_deletion_fails
=== PAUSE TestDeleteVMSS/vmss_deletion_fails
=== CONT  TestDeleteVMSS/successfully_delete_an_existing_vmss
=== CONT  TestDeleteVMSS/vmss_deletion_fails
=== CONT  TestDeleteVMSS/vmss_already_deleted
I0923 20:39:06.076390   47130 scalesets.go:187]  "msg"="deleting VMSS"  "scale set"="my-vmss"
I0923 20:39:06.076396   47130 scalesets.go:187]  "msg"="deleting VMSS"  "scale set"="my-vmss"
--- PASS: TestDeleteVMSS (0.00s)
    --- PASS: TestDeleteVMSS/successfully_delete_an_existing_vmss (0.00s)
    --- PASS: TestDeleteVMSS/vmss_already_deleted (0.00s)
    --- PASS: TestDeleteVMSS/vmss_deletion_fails (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets	6.214s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesets/mock_scalesets	[no test files]
=== RUN   TestNewService
--- PASS: TestNewService (0.00s)
=== RUN   TestService_Reconcile
=== RUN   TestService_Reconcile/should_reconcile_successfully
=== RUN   TestService_Reconcile/if_404,_then_should_respond_with_transient_error
=== RUN   TestService_Reconcile/if_other_error,_then_should_respond_with_error
--- PASS: TestService_Reconcile (0.00s)
    --- PASS: TestService_Reconcile/should_reconcile_successfully (0.00s)
    --- PASS: TestService_Reconcile/if_404,_then_should_respond_with_transient_error (0.00s)
    --- PASS: TestService_Reconcile/if_other_error,_then_should_respond_with_error (0.00s)
=== RUN   TestService_Delete
=== RUN   TestService_Delete/should_start_deleting_successfully_if_no_long_running_operation_is_active
=== RUN   TestService_Delete/should_finish_deleting_successfully_when_there's_a_long_running_operation_that_has_completed
=== RUN   TestService_Delete/should_not_error_when_deleting,_but_resource_is_404
=== RUN   TestService_Delete/should_error_when_deleting,_but_a_non-404_error_is_returned_from_DELETE_call
=== RUN   TestService_Delete/should_return_error_when_a_long_running_operation_is_active_and_getting_the_result_returns_an_error
--- PASS: TestService_Delete (0.00s)
    --- PASS: TestService_Delete/should_start_deleting_successfully_if_no_long_running_operation_is_active (0.00s)
    --- PASS: TestService_Delete/should_finish_deleting_successfully_when_there's_a_long_running_operation_that_has_completed (0.00s)
    --- PASS: TestService_Delete/should_not_error_when_deleting,_but_resource_is_404 (0.00s)
    --- PASS: TestService_Delete/should_error_when_deleting,_but_a_non-404_error_is_returned_from_DELETE_call (0.00s)
    --- PASS: TestService_Delete/should_return_error_when_a_long_running_operation_is_active_and_getting_the_result_returns_an_error (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms	6.348s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/scalesetvms/mock_scalesetvms	[no test files]
=== RUN   TestReconcileSecurityGroups
=== RUN   TestReconcileSecurityGroups/security_groups_do_not_exist
=== PAUSE TestReconcileSecurityGroups/security_groups_do_not_exist
=== RUN   TestReconcileSecurityGroups/security_group_exists
=== PAUSE TestReconcileSecurityGroups/security_group_exists
=== RUN   TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode
=== PAUSE TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode
=== CONT  TestReconcileSecurityGroups/security_groups_do_not_exist
=== CONT  TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode
=== CONT  TestReconcileSecurityGroups/security_group_exists
I0923 20:39:07.197990   47136 securitygroups.go:61]  "msg"="Skipping network security group reconcile in custom VNet mode"
I0923 20:39:07.198121   47136 securitygroups.go:93]  "msg"="creating security group"  "security group"="nsg-one"
I0923 20:39:07.198380   47136 securitygroups.go:110]  "msg"="successfully created or updated security group"  "security group"="nsg-one"
I0923 20:39:07.198430   47136 securitygroups.go:89]  "msg"="security group exists and no default rules are missing, skipping update"  "security group"="nsg-two"
I0923 20:39:07.198455   47136 securitygroups.go:110]  "msg"="successfully created or updated security group"  "security group"="nsg-one"
I0923 20:39:07.198500   47136 securitygroups.go:93]  "msg"="creating security group"  "security group"="nsg-two"
I0923 20:39:07.198577   47136 securitygroups.go:110]  "msg"="successfully created or updated security group"  "security group"="nsg-two"
--- PASS: TestReconcileSecurityGroups (0.00s)
    --- PASS: TestReconcileSecurityGroups/skipping_network_security_group_reconcile_in_custom_VNet_mode (0.00s)
    --- PASS: TestReconcileSecurityGroups/security_group_exists (0.00s)
    --- PASS: TestReconcileSecurityGroups/security_groups_do_not_exist (0.00s)
=== RUN   TestDeleteSecurityGroups
=== RUN   TestDeleteSecurityGroups/security_groups_exist
=== PAUSE TestDeleteSecurityGroups/security_groups_exist
=== RUN   TestDeleteSecurityGroups/security_group_already_deleted
=== PAUSE TestDeleteSecurityGroups/security_group_already_deleted
=== RUN   TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode
=== PAUSE TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode
=== CONT  TestDeleteSecurityGroups/security_groups_exist
=== CONT  TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode
=== CONT  TestDeleteSecurityGroups/security_group_already_deleted
I0923 20:39:07.198867   47136 securitygroups.go:144]  "msg"="Skipping network security group delete in custom VNet mode"
I0923 20:39:07.198953   47136 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-one"
I0923 20:39:07.198957   47136 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-one"
I0923 20:39:07.198981   47136 securitygroups.go:159]  "msg"="successfully deleted security group"  "security group"="nsg-one"
I0923 20:39:07.198997   47136 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-two"
I0923 20:39:07.199003   47136 securitygroups.go:149]  "msg"="deleting security group"  "security group"="nsg-two"
I0923 20:39:07.199025   47136 securitygroups.go:159]  "msg"="successfully deleted security group"  "security group"="nsg-two"
I0923 20:39:07.199032   47136 securitygroups.go:159]  "msg"="successfully deleted security group"  "security group"="nsg-two"
--- PASS: TestDeleteSecurityGroups (0.00s)
    --- PASS: TestDeleteSecurityGroups/skipping_network_security_group_delete_in_custom_VNet_mode (0.00s)
    --- PASS: TestDeleteSecurityGroups/security_groups_exist (0.00s)
    --- PASS: TestDeleteSecurityGroups/security_group_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups	6.774s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/securitygroups/mock_securitygroups	[no test files]
=== RUN   TestReconcileSubnets
=== RUN   TestReconcileSubnets/subnet_does_not_exist
=== PAUSE TestReconcileSubnets/subnet_does_not_exist
=== RUN   TestReconcileSubnets/subnet_ipv6_does_not_exist
=== PAUSE TestReconcileSubnets/subnet_ipv6_does_not_exist
=== RUN   TestReconcileSubnets/fail_to_create_subnet
=== PAUSE TestReconcileSubnets/fail_to_create_subnet
=== RUN   TestReconcileSubnets/fail_to_get_existing_subnet
=== PAUSE TestReconcileSubnets/fail_to_get_existing_subnet
=== RUN   TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing
=== PAUSE TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing
=== RUN   TestReconcileSubnets/vnet_was_provided_and_subnet_exists
=== PAUSE TestReconcileSubnets/vnet_was_provided_and_subnet_exists
=== RUN   TestReconcileSubnets/vnet_for_ipv6_is_provided
=== PAUSE TestReconcileSubnets/vnet_for_ipv6_is_provided
=== RUN   TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway
=== PAUSE TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway
=== RUN   TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values
=== PAUSE TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values
=== CONT  TestReconcileSubnets/subnet_does_not_exist
=== CONT  TestReconcileSubnets/vnet_was_provided_and_subnet_exists
=== CONT  TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway
=== CONT  TestReconcileSubnets/vnet_for_ipv6_is_provided
=== CONT  TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values
=== CONT  TestReconcileSubnets/fail_to_get_existing_subnet
=== CONT  TestReconcileSubnets/subnet_ipv6_does_not_exist
=== CONT  TestReconcileSubnets/fail_to_create_subnet
=== CONT  TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing
I0923 20:39:07.792429   47138 subnets.go:103]  "msg"="creating subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.792680   47138 subnets.go:103]  "msg"="creating subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.792449   47138 subnets.go:103]  "msg"="creating subnet in vnet"  "subnet"="my-ipv6-subnet" "vnet"="my-vnet"
I0923 20:39:07.793128   47138 subnets.go:117]  "msg"="successfully created subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.793273   47138 subnets.go:117]  "msg"="successfully created subnet in vnet"  "subnet"="my-ipv6-subnet" "vnet"="my-vnet"
--- PASS: TestReconcileSubnets (0.00s)
    --- PASS: TestReconcileSubnets/doesn't_overwrite_existing_NAT_Gateway (0.00s)
    --- PASS: TestReconcileSubnets/vnet_was_provided_and_subnet_exists (0.00s)
    --- PASS: TestReconcileSubnets/spec_has_empty_CIDR_and_ID_data_but_GET_from_Azure_has_the_values (0.00s)
    --- PASS: TestReconcileSubnets/vnet_for_ipv6_is_provided (0.00s)
    --- PASS: TestReconcileSubnets/fail_to_get_existing_subnet (0.00s)
    --- PASS: TestReconcileSubnets/fail_to_create_subnet (0.00s)
    --- PASS: TestReconcileSubnets/subnet_does_not_exist (0.00s)
    --- PASS: TestReconcileSubnets/subnet_ipv6_does_not_exist (0.00s)
    --- PASS: TestReconcileSubnets/vnet_was_provided_but_subnet_is_missing (0.00s)
=== RUN   TestDeleteSubnets
=== RUN   TestDeleteSubnets/subnet_deleted_successfully
=== PAUSE TestDeleteSubnets/subnet_deleted_successfully
=== RUN   TestDeleteSubnets/subnet_already_deleted
=== PAUSE TestDeleteSubnets/subnet_already_deleted
=== RUN   TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully
=== PAUSE TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully
=== RUN   TestDeleteSubnets/skip_delete_if_vnet_is_managed
=== PAUSE TestDeleteSubnets/skip_delete_if_vnet_is_managed
=== RUN   TestDeleteSubnets/fail_delete_subnet
=== PAUSE TestDeleteSubnets/fail_delete_subnet
=== CONT  TestDeleteSubnets/subnet_deleted_successfully
=== CONT  TestDeleteSubnets/skip_delete_if_vnet_is_managed
=== CONT  TestDeleteSubnets/fail_delete_subnet
=== CONT  TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully
=== CONT  TestDeleteSubnets/subnet_already_deleted
I0923 20:39:07.794029   47138 subnets.go:130]  "msg"="Skipping subnets deletion in custom vnet mode"
I0923 20:39:07.794032   47138 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.794068   47138 subnets.go:143]  "msg"="successfully deleted subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.794069   47138 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.794091   47138 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.794101   47138 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
I0923 20:39:07.794076   47138 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet" "vnet"="my-vnet"
I0923 20:39:07.794136   47138 subnets.go:133]  "msg"="deleting subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
I0923 20:39:07.794154   47138 subnets.go:143]  "msg"="successfully deleted subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
I0923 20:39:07.794165   47138 subnets.go:143]  "msg"="successfully deleted subnet in vnet"  "subnet"="my-subnet-1" "vnet"="my-vnet"
--- PASS: TestDeleteSubnets (0.00s)
    --- PASS: TestDeleteSubnets/skip_delete_if_vnet_is_managed (0.00s)
    --- PASS: TestDeleteSubnets/subnet_already_deleted (0.00s)
    --- PASS: TestDeleteSubnets/fail_delete_subnet (0.00s)
    --- PASS: TestDeleteSubnets/subnet_deleted_successfully (0.00s)
    --- PASS: TestDeleteSubnets/node_subnet_already_deleted_and_controlplane_subnet_deleted_successfully (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets	7.093s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/subnets/mock_subnets	[no test files]
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags
=== PAUSE TestReconcileTags/create_tags
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags
=== CONT  TestReconcileTags/error_updating_tags
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/tags_unchanged
I0923 20:39:08.259740   47141 tags.go:66]  "msg"="Updating tags"
I0923 20:39:08.259740   47141 tags.go:66]  "msg"="Updating tags"
I0923 20:39:08.259747   47141 tags.go:66]  "msg"="Updating tags"
I0923 20:39:08.260041   47141 tags.go:91]  "msg"="successfully updated tags"
I0923 20:39:08.260053   47141 tags.go:66]  "msg"="Updating tags"
I0923 20:39:08.260071   47141 tags.go:91]  "msg"="successfully updated tags"
--- PASS: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/create_tags (0.00s)
=== RUN   TestTagsChanged
=== RUN   TestTagsChanged/tag_deleted_and_another_created
=== RUN   TestTagsChanged/tags_are_the_same
=== RUN   TestTagsChanged/tag_value_changed
=== RUN   TestTagsChanged/tag_deleted
=== RUN   TestTagsChanged/tag_created
--- PASS: TestTagsChanged (0.00s)
    --- PASS: TestTagsChanged/tag_deleted_and_another_created (0.00s)
    --- PASS: TestTagsChanged/tags_are_the_same (0.00s)
    --- PASS: TestTagsChanged/tag_value_changed (0.00s)
    --- PASS: TestTagsChanged/tag_deleted (0.00s)
    --- PASS: TestTagsChanged/tag_created (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	7.119s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags/mock_tags	[no test files]
=== RUN   TestGetExistingVM
=== RUN   TestGetExistingVM/get_existing_vm
=== PAUSE TestGetExistingVM/get_existing_vm
=== RUN   TestGetExistingVM/vm_not_found
=== PAUSE TestGetExistingVM/vm_not_found
=== RUN   TestGetExistingVM/vm_retrieval_fails
=== PAUSE TestGetExistingVM/vm_retrieval_fails
=== RUN   TestGetExistingVM/get_existing_vm:_error_getting_public_IP
=== PAUSE TestGetExistingVM/get_existing_vm:_error_getting_public_IP
=== RUN   TestGetExistingVM/get_existing_vm:_public_IP_not_found
=== PAUSE TestGetExistingVM/get_existing_vm:_public_IP_not_found
=== CONT  TestGetExistingVM/get_existing_vm
=== CONT  TestGetExistingVM/get_existing_vm:_error_getting_public_IP
=== CONT  TestGetExistingVM/get_existing_vm:_public_IP_not_found
=== CONT  TestGetExistingVM/vm_retrieval_fails
=== CONT  TestGetExistingVM/vm_not_found
--- PASS: TestGetExistingVM (0.00s)
    --- PASS: TestGetExistingVM/get_existing_vm:_error_getting_public_IP (0.00s)
    --- PASS: TestGetExistingVM/get_existing_vm:_public_IP_not_found (0.00s)
    --- PASS: TestGetExistingVM/vm_not_found (0.00s)
    --- PASS: TestGetExistingVM/vm_retrieval_fails (0.00s)
    --- PASS: TestGetExistingVM/get_existing_vm (0.00s)
=== RUN   TestReconcileVM
=== RUN   TestReconcileVM/can_create_a_vm
=== PAUSE TestReconcileVM/can_create_a_vm
=== RUN   TestReconcileVM/can_create_a_vm_with_system_assigned_identity
=== PAUSE TestReconcileVM/can_create_a_vm_with_system_assigned_identity
=== RUN   TestReconcileVM/can_create_a_vm_with_user_assigned_identity
=== PAUSE TestReconcileVM/can_create_a_vm_with_user_assigned_identity
=== RUN   TestReconcileVM/can_create_a_spot_vm
=== PAUSE TestReconcileVM/can_create_a_spot_vm
=== RUN   TestReconcileVM/can_create_a_windows_vm
=== PAUSE TestReconcileVM/can_create_a_windows_vm
=== RUN   TestReconcileVM/can_create_a_vm_with_encryption
=== PAUSE TestReconcileVM/can_create_a_vm_with_encryption
=== RUN   TestReconcileVM/can_create_a_vm_with_encryption_at_host
=== PAUSE TestReconcileVM/can_create_a_vm_with_encryption_at_host
=== RUN   TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set
=== PAUSE TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set
=== RUN   TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== PAUSE TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== RUN   TestReconcileVM/vm_creation_fails
=== PAUSE TestReconcileVM/vm_creation_fails
=== RUN   TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2
=== PAUSE TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2
=== RUN   TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi
=== PAUSE TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi
=== RUN   TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os
=== PAUSE TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os
=== RUN   TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk
=== PAUSE TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk
=== RUN   TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan
=== PAUSE TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan
=== RUN   TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_
=== PAUSE TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_
=== RUN   TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan
=== PAUSE TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan
=== RUN   TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled
=== PAUSE TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled
=== RUN   TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled
=== PAUSE TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVM/can_create_a_vm
=== CONT  TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2
=== CONT  TestReconcileVM/can_create_a_vm_with_encryption
=== CONT  TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_
=== CONT  TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails
=== CONT  TestReconcileVM/vm_creation_fails
=== CONT  TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set
=== CONT  TestReconcileVM/can_create_a_windows_vm
=== CONT  TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os
=== CONT  TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled
=== CONT  TestReconcileVM/can_create_a_vm_with_user_assigned_identity
=== CONT  TestReconcileVM/can_create_a_vm_with_encryption_at_host
=== CONT  TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi
=== CONT  TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk
I0923 20:39:08.717000   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
=== CONT  TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan
I0923 20:39:08.717620   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-ultra-ssd-vm"
I0923 20:39:08.717634   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.717728   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.717000   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.717000   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.717808   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
=== CONT  TestReconcileVM/can_create_a_spot_vm
=== CONT  TestReconcileVM/can_create_a_vm_with_system_assigned_identity
=== CONT  TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan
I0923 20:39:08.717999   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718010   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718012   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.717091   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718110   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718118   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.717103   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.717576   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718314   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718338   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718172   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718421   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718527   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718794   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718183   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718823   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-ultra-ssd-vm"
I0923 20:39:08.717119   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.717127   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-ultra-ssd-vm"
I0923 20:39:08.717490   47143 virtualmachines.go:103]  "msg"="creating VM"  "vm"="my-vm"
I0923 20:39:08.718427   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718903   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718976   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
I0923 20:39:08.718999   47143 virtualmachines.go:208]  "msg"="successfully created VM"  "vm"="my-vm"
--- PASS: TestReconcileVM (0.00s)
    --- PASS: TestReconcileVM/fails_when_there_is_a_provider_id_present,_but_cannot_find_vm_ (0.00s)
    --- PASS: TestReconcileVM/vm_creation_fails (0.00s)
    --- PASS: TestReconcileVM/cannot_create_vm_if_vCPU_is_less_than_2 (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_encryption (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_system_assigned_identity (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_encryption_at_host (0.00s)
    --- PASS: TestReconcileVM/cannot_create_vm_if_does_not_support_ephemeral_os (0.00s)
    --- PASS: TestReconcileVM/can_create_a_spot_vm (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_user_assigned_identity (0.00s)
    --- PASS: TestReconcileVM/can_create_a_windows_vm (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_EphemeralOSDisk (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_ultra_disk_enabled (0.00s)
    --- PASS: TestReconcileVM/creating_a_vm_with_encryption_at_host_enabled_for_unsupported_VM_type_fails (0.00s)
    --- PASS: TestReconcileVM/fail_to_create_a_vm_with_ultra_disk_enabled (0.00s)
    --- PASS: TestReconcileVM/cannot_create_vm_if_memory_is_less_than_2Gi (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_and_assign_it_to_an_availability_set (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_a_SIG_image_using_a_plan (0.00s)
    --- PASS: TestReconcileVM/can_create_a_vm_with_a_marketplace_image_using_a_plan (0.00s)
=== RUN   TestDeleteVM
=== RUN   TestDeleteVM/successfully_delete_an_existing_vm
=== PAUSE TestDeleteVM/successfully_delete_an_existing_vm
=== RUN   TestDeleteVM/vm_already_deleted
=== PAUSE TestDeleteVM/vm_already_deleted
=== RUN   TestDeleteVM/vm_deletion_fails
=== PAUSE TestDeleteVM/vm_deletion_fails
=== CONT  TestDeleteVM/successfully_delete_an_existing_vm
=== CONT  TestDeleteVM/vm_deletion_fails
=== CONT  TestDeleteVM/vm_already_deleted
I0923 20:39:08.719272   47143 virtualmachines.go:220]  "msg"="deleting VM"  "vm"="my-existing-vm"
I0923 20:39:08.719272   47143 virtualmachines.go:220]  "msg"="deleting VM"  "vm"="my-vm"
I0923 20:39:08.719298   47143 virtualmachines.go:230]  "msg"="successfully deleted VM"  "vm"="my-existing-vm"
I0923 20:39:08.719273   47143 virtualmachines.go:220]  "msg"="deleting VM"  "vm"="my-vm"
--- PASS: TestDeleteVM (0.00s)
    --- PASS: TestDeleteVM/successfully_delete_an_existing_vm (0.00s)
    --- PASS: TestDeleteVM/vm_deletion_fails (0.00s)
    --- PASS: TestDeleteVM/vm_already_deleted (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines	7.114s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualmachines/mock_virtualmachines	[no test files]
=== RUN   TestReconcileVnet
=== RUN   TestReconcileVnet/managed_vnet_exists
=== PAUSE TestReconcileVnet/managed_vnet_exists
=== RUN   TestReconcileVnet/managed_ipv6_vnet_exists
=== PAUSE TestReconcileVnet/managed_ipv6_vnet_exists
=== RUN   TestReconcileVnet/vnet_created_successufuly
=== PAUSE TestReconcileVnet/vnet_created_successufuly
=== RUN   TestReconcileVnet/ipv6_vnet_created_successufuly
=== PAUSE TestReconcileVnet/ipv6_vnet_created_successufuly
=== RUN   TestReconcileVnet/unmanaged_vnet_exists
=== PAUSE TestReconcileVnet/unmanaged_vnet_exists
=== RUN   TestReconcileVnet/custom_vnet_not_found
=== PAUSE TestReconcileVnet/custom_vnet_not_found
=== RUN   TestReconcileVnet/failed_to_fetch_vnet
=== PAUSE TestReconcileVnet/failed_to_fetch_vnet
=== RUN   TestReconcileVnet/fail_to_create_vnet
=== PAUSE TestReconcileVnet/fail_to_create_vnet
=== CONT  TestReconcileVnet/managed_vnet_exists
=== CONT  TestReconcileVnet/unmanaged_vnet_exists
=== CONT  TestReconcileVnet/ipv6_vnet_created_successufuly
=== CONT  TestReconcileVnet/managed_ipv6_vnet_exists
=== CONT  TestReconcileVnet/failed_to_fetch_vnet
=== CONT  TestReconcileVnet/fail_to_create_vnet
=== CONT  TestReconcileVnet/custom_vnet_not_found
=== CONT  TestReconcileVnet/vnet_created_successufuly
I0923 20:39:09.194940   47145 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="vnet-ipv6-new"
I0923 20:39:09.194944   47145 virtualnetworks.go:78]  "msg"="Working on custom VNet"  "vnet-id"="azure/custom-vnet/id"
I0923 20:39:09.194993   47145 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="custom-vnet"
I0923 20:39:09.195000   47145 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="custom-vnet"
I0923 20:39:09.195103   47145 virtualnetworks.go:83]  "msg"="creating VNet"  "VNet"="vnet-new"
I0923 20:39:09.195231   47145 virtualnetworks.go:104]  "msg"="successfully created VNet"  "VNet"="custom-vnet"
I0923 20:39:09.195265   47145 virtualnetworks.go:104]  "msg"="successfully created VNet"  "VNet"="vnet-new"
I0923 20:39:09.195272   47145 virtualnetworks.go:104]  "msg"="successfully created VNet"  "VNet"="vnet-ipv6-new"
--- PASS: TestReconcileVnet (0.00s)
    --- PASS: TestReconcileVnet/managed_vnet_exists (0.00s)
    --- PASS: TestReconcileVnet/managed_ipv6_vnet_exists (0.00s)
    --- PASS: TestReconcileVnet/failed_to_fetch_vnet (0.00s)
    --- PASS: TestReconcileVnet/unmanaged_vnet_exists (0.00s)
    --- PASS: TestReconcileVnet/custom_vnet_not_found (0.00s)
    --- PASS: TestReconcileVnet/fail_to_create_vnet (0.00s)
    --- PASS: TestReconcileVnet/vnet_created_successufuly (0.00s)
    --- PASS: TestReconcileVnet/ipv6_vnet_created_successufuly (0.00s)
=== RUN   TestDeleteVnet
=== RUN   TestDeleteVnet/managed_vnet_exists
=== PAUSE TestDeleteVnet/managed_vnet_exists
=== RUN   TestDeleteVnet/managed_vnet_already_deleted
=== PAUSE TestDeleteVnet/managed_vnet_already_deleted
=== RUN   TestDeleteVnet/unmanaged_vnet
=== PAUSE TestDeleteVnet/unmanaged_vnet
=== RUN   TestDeleteVnet/fail_to_delete_vnet
=== PAUSE TestDeleteVnet/fail_to_delete_vnet
=== CONT  TestDeleteVnet/managed_vnet_exists
=== CONT  TestDeleteVnet/unmanaged_vnet
=== CONT  TestDeleteVnet/fail_to_delete_vnet
=== CONT  TestDeleteVnet/managed_vnet_already_deleted
I0923 20:39:09.195464   47145 virtualnetworks.go:123]  "msg"="Skipping VNet deletion in custom vnet mode"
I0923 20:39:09.195468   47145 virtualnetworks.go:127]  "msg"="deleting VNet"  "VNet"="vnet-exists"
I0923 20:39:09.195481   47145 virtualnetworks.go:138]  "msg"="successfully deleted VNet"  "VNet"="vnet-exists"
I0923 20:39:09.195484   47145 virtualnetworks.go:127]  "msg"="deleting VNet"  "VNet"="vnet-exists"
--- PASS: TestDeleteVnet (0.00s)
    --- PASS: TestDeleteVnet/managed_vnet_already_deleted (0.00s)
    --- PASS: TestDeleteVnet/unmanaged_vnet (0.00s)
    --- PASS: TestDeleteVnet/managed_vnet_exists (0.00s)
    --- PASS: TestDeleteVnet/fail_to_delete_vnet (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks	7.216s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/virtualnetworks/mock_virtualnetworks	[no test files]
=== RUN   TestReconcileVMExtension
=== RUN   TestReconcileVMExtension/extension_is_in_succeeded_state
=== PAUSE TestReconcileVMExtension/extension_is_in_succeeded_state
=== RUN   TestReconcileVMExtension/extension_is_in_failed_state
=== PAUSE TestReconcileVMExtension/extension_is_in_failed_state
=== RUN   TestReconcileVMExtension/extension_is_still_creating
=== PAUSE TestReconcileVMExtension/extension_is_still_creating
=== RUN   TestReconcileVMExtension/reconcile_multiple_extensions
=== PAUSE TestReconcileVMExtension/reconcile_multiple_extensions
=== RUN   TestReconcileVMExtension/error_getting_the_extension
=== PAUSE TestReconcileVMExtension/error_getting_the_extension
=== RUN   TestReconcileVMExtension/error_creating_the_extension
=== PAUSE TestReconcileVMExtension/error_creating_the_extension
=== CONT  TestReconcileVMExtension/extension_is_in_succeeded_state
=== CONT  TestReconcileVMExtension/error_getting_the_extension
=== CONT  TestReconcileVMExtension/reconcile_multiple_extensions
=== CONT  TestReconcileVMExtension/extension_is_in_failed_state
=== CONT  TestReconcileVMExtension/error_creating_the_extension
=== CONT  TestReconcileVMExtension/extension_is_still_creating
I0923 20:39:09.604928   47148 vmextensions.go:69]  "msg"="creating VM extension"  "vm extension"="my-extension-1"
I0923 20:39:09.604945   47148 vmextensions.go:69]  "msg"="creating VM extension"  "vm extension"="my-extension-1"
I0923 20:39:09.605231   47148 vmextensions.go:89]  "msg"="successfully created VM extension"  "vm extension"="my-extension-1"
I0923 20:39:09.605267   47148 vmextensions.go:69]  "msg"="creating VM extension"  "vm extension"="other-extension"
I0923 20:39:09.605297   47148 vmextensions.go:89]  "msg"="successfully created VM extension"  "vm extension"="other-extension"
--- PASS: TestReconcileVMExtension (0.00s)
    --- PASS: TestReconcileVMExtension/extension_is_in_failed_state (0.00s)
    --- PASS: TestReconcileVMExtension/error_getting_the_extension (0.00s)
    --- PASS: TestReconcileVMExtension/extension_is_in_succeeded_state (0.00s)
    --- PASS: TestReconcileVMExtension/extension_is_still_creating (0.00s)
    --- PASS: TestReconcileVMExtension/error_creating_the_extension (0.00s)
    --- PASS: TestReconcileVMExtension/reconcile_multiple_extensions (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions	7.176s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmextensions/mock_vmextensions	[no test files]
=== RUN   TestReconcileVMSSExtension
=== RUN   TestReconcileVMSSExtension/extension_already_exists
=== PAUSE TestReconcileVMSSExtension/extension_already_exists
=== RUN   TestReconcileVMSSExtension/extension_does_not_exist
=== PAUSE TestReconcileVMSSExtension/extension_does_not_exist
=== RUN   TestReconcileVMSSExtension/error_getting_the_extension
=== PAUSE TestReconcileVMSSExtension/error_getting_the_extension
=== CONT  TestReconcileVMSSExtension/extension_already_exists
=== CONT  TestReconcileVMSSExtension/error_getting_the_extension
=== CONT  TestReconcileVMSSExtension/extension_does_not_exist
--- PASS: TestReconcileVMSSExtension (0.00s)
    --- PASS: TestReconcileVMSSExtension/extension_does_not_exist (0.00s)
    --- PASS: TestReconcileVMSSExtension/extension_already_exists (0.00s)
    --- PASS: TestReconcileVMSSExtension/error_getting_the_extension (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions	5.665s
?   	sigs.k8s.io/cluster-api-provider-azure/azure/services/vmssextensions/mock_vmssextensions	[no test files]
=== RUN   TestAzureClusterReconcilerDelete
=== RUN   TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster
=== PAUSE TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster
=== RUN   TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails
=== PAUSE TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails
=== RUN   TestAzureClusterReconcilerDelete/Route_table_delete_fails
=== PAUSE TestAzureClusterReconcilerDelete/Route_table_delete_fails
=== RUN   TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully
=== PAUSE TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully
=== RUN   TestAzureClusterReconcilerDelete/Resource_Group_delete_fails
=== PAUSE TestAzureClusterReconcilerDelete/Resource_Group_delete_fails
=== CONT  TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster
=== CONT  TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully
=== CONT  TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails
=== CONT  TestAzureClusterReconcilerDelete/Route_table_delete_fails
=== CONT  TestAzureClusterReconcilerDelete/Resource_Group_delete_fails
--- PASS: TestAzureClusterReconcilerDelete (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Resource_Group_is_deleted_successfully (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Resource_Group_not_owned_by_cluster (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Load_Balancer_delete_fails (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Resource_Group_delete_fails (0.00s)
    --- PASS: TestAzureClusterReconcilerDelete/Route_table_delete_fails (0.00s)
=== RUN   TestUnclonedMachinesPredicate
=== RUN   TestUnclonedMachinesPredicate/cloned_node_should_return_false
=== PAUSE TestUnclonedMachinesPredicate/cloned_node_should_return_false
=== RUN   TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true
=== PAUSE TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true
=== RUN   TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true
=== PAUSE TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true
=== CONT  TestUnclonedMachinesPredicate/cloned_node_should_return_false
=== CONT  TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true
=== CONT  TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true
--- PASS: TestUnclonedMachinesPredicate (0.00s)
    --- PASS: TestUnclonedMachinesPredicate/cloned_node_should_return_false (0.00s)
    --- PASS: TestUnclonedMachinesPredicate/uncloned_worker_node_should_return_true (0.00s)
    --- PASS: TestUnclonedMachinesPredicate/uncloned_control_plane_node_should_return_true (0.00s)
=== RUN   TestAzureJSONMachineReconciler
=== RUN   TestAzureJSONMachineReconciler/should_reconcile_normally
=== RUN   TestAzureJSONMachineReconciler/missing_azure_cluster_should_return_error
E0923 20:39:13.111064   47329 azurejson_machine_controller.go:160]  "msg"="failed to fetch AzureCluster" "error"="azureclusters.infrastructure.cluster.x-k8s.io \"my-azure-cluster\" not found" "azureMachine"="my-machine" "cluster"="my-cluster" "namespace"=""
--- PASS: TestAzureJSONMachineReconciler (0.01s)
    --- PASS: TestAzureJSONMachineReconciler/should_reconcile_normally (0.00s)
    --- PASS: TestAzureJSONMachineReconciler/missing_azure_cluster_should_return_error (0.00s)
=== RUN   TestAzureJSONPoolReconciler
=== RUN   TestAzureJSONPoolReconciler/should_reconcile_normally
=== RUN   TestAzureJSONPoolReconciler/missing_azure_cluster_should_return_error
E0923 20:39:13.115052   47329 azurejson_machinepool_controller.go:127]  "msg"="failed to fetch AzureCluster" "error"="azureclusters.infrastructure.cluster.x-k8s.io \"my-azure-cluster\" not found" "azureMachinePool"="my-azure-machine-pool" "cluster"="my-cluster" "machinePool"="my-machine-pool" "namespace"=""
--- PASS: TestAzureJSONPoolReconciler (0.00s)
    --- PASS: TestAzureJSONPoolReconciler/should_reconcile_normally (0.00s)
    --- PASS: TestAzureJSONPoolReconciler/missing_azure_cluster_should_return_error (0.00s)
=== RUN   TestAzureJSONTemplateReconciler
=== RUN   TestAzureJSONTemplateReconciler/should_reconcile_normally
=== RUN   TestAzureJSONTemplateReconciler/missing_azure_cluster_should_return_error
E0923 20:39:13.117285   47329 azurejson_machinetemplate_controller.go:123]  "msg"="failed to fetch AzureCluster" "error"="azureclusters.infrastructure.cluster.x-k8s.io \"my-azure-cluster\" not found" "azureMachineTemplate"="my-json-template" "cluster"="my-cluster" "namespace"=""
--- PASS: TestAzureJSONTemplateReconciler (0.00s)
    --- PASS: TestAzureJSONTemplateReconciler/should_reconcile_normally (0.00s)
    --- PASS: TestAzureJSONTemplateReconciler/missing_azure_cluster_should_return_error (0.00s)
=== RUN   TestConditions
=== RUN   TestConditions/cluster_infrastructure_is_not_ready_yet
I0923 20:39:13.118997   47329 azuremachine_controller.go:250]  "msg"="Reconciling AzureMachine"
I0923 20:39:13.119253   47329 azuremachine_controller.go:265]  "msg"="Cluster infrastructure is not ready yet"
=== RUN   TestConditions/bootstrap_data_secret_reference_is_not_yet_available
I0923 20:39:13.119380   47329 azuremachine_controller.go:250]  "msg"="Reconciling AzureMachine"
I0923 20:39:13.119568   47329 azuremachine_controller.go:272]  "msg"="Bootstrap data secret reference is not yet available"
--- PASS: TestConditions (0.00s)
    --- PASS: TestConditions/cluster_infrastructure_is_not_ready_yet (0.00s)
    --- PASS: TestConditions/bootstrap_data_secret_reference_is_not_yet_available (0.00s)
=== RUN   TestAzureClusterToAzureMachinesMapper
--- PASS: TestAzureClusterToAzureMachinesMapper (0.00s)
=== RUN   TestGetCloudProviderConfig
=== RUN   TestGetCloudProviderConfig/system-assigned-identity
=== RUN   TestGetCloudProviderConfig/user-assigned-identity
=== RUN   TestGetCloudProviderConfig/serviceprincipal_with_custom_vnet
=== RUN   TestGetCloudProviderConfig/with_rate_limits
=== RUN   TestGetCloudProviderConfig/with_back-off_config
=== RUN   TestGetCloudProviderConfig/serviceprincipal
--- PASS: TestGetCloudProviderConfig (0.00s)
    --- PASS: TestGetCloudProviderConfig/system-assigned-identity (0.00s)
    --- PASS: TestGetCloudProviderConfig/user-assigned-identity (0.00s)
    --- PASS: TestGetCloudProviderConfig/serviceprincipal_with_custom_vnet (0.00s)
    --- PASS: TestGetCloudProviderConfig/with_rate_limits (0.00s)
    --- PASS: TestGetCloudProviderConfig/with_back-off_config (0.00s)
    --- PASS: TestGetCloudProviderConfig/serviceprincipal (0.00s)
=== RUN   TestReconcileAzureSecret
2021-09-23T20:39:13.123+0530	INFO	azurecluster-resource	default	{"name": "foo"}
=== RUN   TestReconcileAzureSecret/azuremachine_should_reconcile_secret_successfully
=== RUN   TestReconcileAzureSecret/azuremachinepool_should_reconcile_secret_successfully
=== RUN   TestReconcileAzureSecret/azuremachinetemplate_should_reconcile_secret_successfully
--- PASS: TestReconcileAzureSecret (0.00s)
    --- PASS: TestReconcileAzureSecret/azuremachine_should_reconcile_secret_successfully (0.00s)
    --- PASS: TestReconcileAzureSecret/azuremachinepool_should_reconcile_secret_successfully (0.00s)
    --- PASS: TestReconcileAzureSecret/azuremachinetemplate_should_reconcile_secret_successfully (0.00s)
=== RUN   TestAPIs
Running Suite: Controller Suite
===============================
Random Seed: 1632409753
Will run 4 of 4 specs

2021-09-23T20:39:13.127+0530	DEBUG	controller-runtime.test-env	starting control plane
2021-09-23T20:39:13.136+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 0, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-23T20:39:13.141+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 1, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-23T20:39:13.144+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 2, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-23T20:39:13.149+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 3, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
2021-09-23T20:39:13.152+0530	ERROR	controller-runtime.test-env	unable to start the controlplane	{"tries": 4, "error": "fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory"}
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).startControlPlane
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:330
sigs.k8s.io/controller-runtime/pkg/envtest.(*Environment).Start
	/Users/karuppiahn/go/pkg/mod/sigs.k8s.io/controller-runtime@v0.9.6/pkg/envtest/server.go:260
sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:104
sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4
	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51
reflect.Value.call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543
reflect.Value.Call
	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339
github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49
github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1
	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86
STEP: bootstrapping test environment
Panic [0.025 seconds]
[BeforeSuite] BeforeSuite
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:49

  Test Panicked
  unable to start control plane itself: failed to start the controlplane. retried 5 times: fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105

  Full Stack Trace
  sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment()
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105 +0x2d1
  sigs.k8s.io/cluster-api-provider-azure/controllers.glob..func4(0x0)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:51 +0x4e
  reflect.Value.call({0x25588a0, 0x2929690, 0x13}, {0x283cdd7, 0x4}, {0xc000a8bf70, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543 +0x814
  reflect.Value.Call({0x25588a0, 0x2929690, 0x0}, {0xc000606770, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339 +0xc5
  github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1(0x0)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49 +0x14f
  github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1()
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86 +0x7a
  created by github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:71 +0xd2
------------------------------


Ran 4 of 0 Specs in 0.026 seconds
FAIL! -- 0 Passed | 4 Failed | 0 Pending | 0 Skipped
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.

  If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters
  You are passing a Done channel to a test node to test asynchronous behavior.  This is deprecated in Ginkgo V2.  Your test will run synchronously and the timeout will be ignored.
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-async-testing
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/controllers/suite_test.go:49

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

--- FAIL: TestAPIs (0.03s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/controllers	4.421s
?   	sigs.k8s.io/cluster-api-provider-azure/exp	[no test files]
=== RUN   TestFuzzyConversion
=== RUN   TestFuzzyConversion/for_AzureMachinePool
=== RUN   TestFuzzyConversion/for_AzureMachinePool/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureMachinePool/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureManagedCluster
=== RUN   TestFuzzyConversion/for_AzureManagedCluster/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureManagedCluster/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureManagedControlPlane
=== RUN   TestFuzzyConversion/for_AzureManagedControlPlane/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureManagedControlPlane/hub-spoke-hub
=== RUN   TestFuzzyConversion/for_AzureManagedMachinePool
=== RUN   TestFuzzyConversion/for_AzureManagedMachinePool/spoke-hub-spoke
=== RUN   TestFuzzyConversion/for_AzureManagedMachinePool/hub-spoke-hub
--- PASS: TestFuzzyConversion (16.43s)
    --- PASS: TestFuzzyConversion/for_AzureMachinePool (6.03s)
        --- PASS: TestFuzzyConversion/for_AzureMachinePool/spoke-hub-spoke (3.15s)
        --- PASS: TestFuzzyConversion/for_AzureMachinePool/hub-spoke-hub (2.88s)
    --- PASS: TestFuzzyConversion/for_AzureManagedCluster (2.76s)
        --- PASS: TestFuzzyConversion/for_AzureManagedCluster/spoke-hub-spoke (1.38s)
        --- PASS: TestFuzzyConversion/for_AzureManagedCluster/hub-spoke-hub (1.38s)
    --- PASS: TestFuzzyConversion/for_AzureManagedControlPlane (4.66s)
        --- PASS: TestFuzzyConversion/for_AzureManagedControlPlane/spoke-hub-spoke (2.00s)
        --- PASS: TestFuzzyConversion/for_AzureManagedControlPlane/hub-spoke-hub (2.67s)
    --- PASS: TestFuzzyConversion/for_AzureManagedMachinePool (2.97s)
        --- PASS: TestFuzzyConversion/for_AzureManagedMachinePool/spoke-hub-spoke (1.44s)
        --- PASS: TestFuzzyConversion/for_AzureManagedMachinePool/hub-spoke-hub (1.53s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha3	19.828s
=== RUN   TestAzureMachinePool_SetDefaultSSHPublicKey
--- PASS: TestAzureMachinePool_SetDefaultSSHPublicKey (0.06s)
=== RUN   TestAzureMachinePool_SetIdentityDefaults
--- PASS: TestAzureMachinePool_SetIdentityDefaults (0.00s)
=== RUN   TestAzureMachinePool_ValidateCreate
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_full
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_publisher
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_shared_gallery_image_-_full
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_subscription
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_with_id
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_without_id
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_wrong_terminate_notification
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity,_but_invalid_role
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity,_but_without_any_provider_ids
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
=== RUN   TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
--- PASS: TestAzureMachinePool_ValidateCreate (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_full (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_publisher (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_shared_gallery_image_-_full (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_marketplace_image_-_missing_subscription (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_with_id (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_image_by_-_without_id (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_wrong_terminate_notification (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_system_assigned_identity,_but_invalid_role (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_user_assigned_identity,_but_without_any_provider_ids (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
    --- PASS: TestAzureMachinePool_ValidateCreate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
=== RUN   TestAzureMachinePool_ValidateUpdate
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_SSHPublicKey
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_unchanged
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_changed
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
=== RUN   TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration
--- PASS: TestAzureMachinePool_ValidateUpdate (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_unchanged (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_system-assigned_identity,_and_role_changed (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_invalid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
    --- PASS: TestAzureMachinePool_ValidateUpdate/azuremachinepool_with_valid_MaxSurge_and_MaxUnavailable_rolling_upgrade_configuration (0.00s)
=== RUN   TestAzureMachinePool_Default
--- PASS: TestAzureMachinePool_Default (0.38s)
=== RUN   TestAzureManagedControlPlane_SetDefaultSSHPublicKey
--- PASS: TestAzureManagedControlPlane_SetDefaultSSHPublicKey (0.06s)
=== RUN   TestDefaultingWebhook
    azuremanagedcontrolplane_webhook_test.go:32: Testing amcp defaulting webhook with no baseline
    azuremanagedcontrolplane_webhook_test.go:53: Testing amcp defaulting webhook with baseline
--- PASS: TestDefaultingWebhook (0.60s)
=== RUN   TestValidatingWebhook
=== RUN   TestValidatingWebhook/Testing_valid_DNSServiceIP
=== PAUSE TestValidatingWebhook/Testing_valid_DNSServiceIP
=== RUN   TestValidatingWebhook/Testing_invalid_DNSServiceIP
=== PAUSE TestValidatingWebhook/Testing_invalid_DNSServiceIP
=== RUN   TestValidatingWebhook/Invalid_Version
=== PAUSE TestValidatingWebhook/Invalid_Version
=== RUN   TestValidatingWebhook/not_following_the_kuberntes_Version_pattern
=== PAUSE TestValidatingWebhook/not_following_the_kuberntes_Version_pattern
=== RUN   TestValidatingWebhook/Version_not_set
=== PAUSE TestValidatingWebhook/Version_not_set
=== RUN   TestValidatingWebhook/Valid_Version
=== PAUSE TestValidatingWebhook/Valid_Version
=== RUN   TestValidatingWebhook/Valid_Managed_AADProfile
=== PAUSE TestValidatingWebhook/Valid_Managed_AADProfile
=== RUN   TestValidatingWebhook/Valid_LoadBalancerProfile
=== PAUSE TestValidatingWebhook/Valid_LoadBalancerProfile
=== RUN   TestValidatingWebhook/Invalid_LoadBalancerProfile.ManagedOutboundIPs
=== PAUSE TestValidatingWebhook/Invalid_LoadBalancerProfile.ManagedOutboundIPs
=== RUN   TestValidatingWebhook/Invalid_LoadBalancerProfile.AllocatedOutboundPorts
=== PAUSE TestValidatingWebhook/Invalid_LoadBalancerProfile.AllocatedOutboundPorts
=== RUN   TestValidatingWebhook/Invalid_LoadBalancerProfile.IdleTimeoutInMinutes
=== PAUSE TestValidatingWebhook/Invalid_LoadBalancerProfile.IdleTimeoutInMinutes
=== RUN   TestValidatingWebhook/LoadBalancerProfile_must_specify_at_most_one_of_ManagedOutboundIPs,_OutboundIPPrefixes_and_OutboundIPs
=== PAUSE TestValidatingWebhook/LoadBalancerProfile_must_specify_at_most_one_of_ManagedOutboundIPs,_OutboundIPPrefixes_and_OutboundIPs
=== CONT  TestValidatingWebhook/Testing_valid_DNSServiceIP
=== CONT  TestValidatingWebhook/Valid_Managed_AADProfile
=== CONT  TestValidatingWebhook/not_following_the_kuberntes_Version_pattern
=== CONT  TestValidatingWebhook/Invalid_Version
=== CONT  TestValidatingWebhook/LoadBalancerProfile_must_specify_at_most_one_of_ManagedOutboundIPs,_OutboundIPPrefixes_and_OutboundIPs
=== CONT  TestValidatingWebhook/Invalid_LoadBalancerProfile.AllocatedOutboundPorts
=== CONT  TestValidatingWebhook/Valid_LoadBalancerProfile
=== CONT  TestValidatingWebhook/Version_not_set
=== CONT  TestValidatingWebhook/Invalid_LoadBalancerProfile.IdleTimeoutInMinutes
=== CONT  TestValidatingWebhook/Testing_invalid_DNSServiceIP
=== CONT  TestValidatingWebhook/Valid_Version
=== CONT  TestValidatingWebhook/Invalid_LoadBalancerProfile.ManagedOutboundIPs
--- PASS: TestValidatingWebhook (0.00s)
    --- PASS: TestValidatingWebhook/Testing_valid_DNSServiceIP (0.00s)
    --- PASS: TestValidatingWebhook/LoadBalancerProfile_must_specify_at_most_one_of_ManagedOutboundIPs,_OutboundIPPrefixes_and_OutboundIPs (0.00s)
    --- PASS: TestValidatingWebhook/Valid_Managed_AADProfile (0.00s)
    --- PASS: TestValidatingWebhook/Invalid_Version (0.00s)
    --- PASS: TestValidatingWebhook/not_following_the_kuberntes_Version_pattern (0.00s)
    --- PASS: TestValidatingWebhook/Valid_LoadBalancerProfile (0.00s)
    --- PASS: TestValidatingWebhook/Version_not_set (0.00s)
    --- PASS: TestValidatingWebhook/Testing_invalid_DNSServiceIP (0.00s)
    --- PASS: TestValidatingWebhook/Invalid_LoadBalancerProfile.AllocatedOutboundPorts (0.00s)
    --- PASS: TestValidatingWebhook/Valid_Version (0.00s)
    --- PASS: TestValidatingWebhook/Invalid_LoadBalancerProfile.IdleTimeoutInMinutes (0.00s)
    --- PASS: TestValidatingWebhook/Invalid_LoadBalancerProfile.ManagedOutboundIPs (0.00s)
=== RUN   TestAzureManagedControlPlane_ValidateCreate
=== RUN   TestAzureManagedControlPlane_ValidateCreate/all_valid
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_DNSServiceIP
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey_with_a_simple_text_and_invalid_DNSServiceIP
=== RUN   TestAzureManagedControlPlane_ValidateCreate/invalid_version
--- PASS: TestAzureManagedControlPlane_ValidateCreate (0.60s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/all_valid (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_DNSServiceIP (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_sshKey_with_a_simple_text_and_invalid_DNSServiceIP (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateCreate/invalid_version (0.00s)
=== RUN   TestAzureManagedControlPlane_ValidateUpdate
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_valid_SSHPublicKey
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_SSHPublicKey
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_serviceIP
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_version
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SubscriptionID_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ResourceGroupName_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NodeResourceGroupName_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_Location_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SSHPublicKey_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable,_unsetting_is_not_allowed
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_can_be_set_after_cluster_creation
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_managed_field_cannot_set_to_false
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_adminGroupObjectIDs_cannot_set_to_empty
=== RUN   TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled#01
--- PASS: TestAzureManagedControlPlane_ValidateUpdate (1.21s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_valid_SSHPublicKey (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_SSHPublicKey (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_serviceIP (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_with_invalid_version (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SubscriptionID_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ResourceGroupName_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NodeResourceGroupName_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_Location_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_SSHPublicKey_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_DNSServiceIP_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPlugin_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_NetworkPolicy_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_LoadBalancerSKU_is_immutable,_unsetting_is_not_allowed (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_can_be_set_after_cluster_creation (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_managed_field_cannot_set_to_false (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_adminGroupObjectIDs_cannot_set_to_empty (0.00s)
    --- PASS: TestAzureManagedControlPlane_ValidateUpdate/AzureManagedControlPlane_ManagedAad_cannot_be_disabled#01 (0.00s)
=== RUN   TestAzureManagedMachinePoolDefaultingWebhook
    azuremanagedmachinepool_webhook_test.go:31: Testing ammp defaulting webhook with mode system
--- PASS: TestAzureManagedMachinePoolDefaultingWebhook (0.00s)
=== RUN   TestAzureManagedMachinePoolUpdatingWebhook
    azuremanagedmachinepool_webhook_test.go:53: Testing ammp updating webhook with mode system
=== RUN   TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_SKU_of_the_agentpool
=== RUN   TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_OSDiskSizeGB_of_the_agentpool
--- PASS: TestAzureManagedMachinePoolUpdatingWebhook (0.00s)
    --- PASS: TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_SKU_of_the_agentpool (0.00s)
    --- PASS: TestAzureManagedMachinePoolUpdatingWebhook/Cannot_change_OSDiskSizeGB_of_the_agentpool (0.00s)
=== RUN   TestAzureMachinePool_Validate
=== RUN   TestAzureMachinePool_Validate/HasNoImage
=== PAUSE TestAzureMachinePool_Validate/HasNoImage
=== RUN   TestAzureMachinePool_Validate/HasValidImage
=== PAUSE TestAzureMachinePool_Validate/HasValidImage
=== RUN   TestAzureMachinePool_Validate/HasInvalidImage
=== PAUSE TestAzureMachinePool_Validate/HasInvalidImage
=== RUN   TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout
=== PAUSE TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout
=== RUN   TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout
=== PAUSE TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout
=== RUN   TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout
=== PAUSE TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout
=== CONT  TestAzureMachinePool_Validate/HasNoImage
=== CONT  TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout
=== CONT  TestAzureMachinePool_Validate/HasValidImage
=== CONT  TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout
=== CONT  TestAzureMachinePool_Validate/HasInvalidImage
=== CONT  TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout
--- PASS: TestAzureMachinePool_Validate (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasNoImage (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasValidImage (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasValidTerminateNotificationTimeout (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasInvalidMinimumTerminateNotificationTimeout (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasInvalidImage (0.00s)
    --- PASS: TestAzureMachinePool_Validate/HasInvalidMaximumTerminateNotificationTimeout (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/exp/api/v1alpha4	6.929s
=== RUN   Test_newAzureMachinePoolService
--- PASS: Test_newAzureMachinePoolService (0.00s)
=== RUN   TestAzureMachinePoolMachineReconciler_Reconcile
=== RUN   TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_reconcile
I0923 20:39:13.611770   47332 azuremachinepoolmachine_controller.go:254]  "msg"="Reconciling AzureMachinePoolMachine" "AzureCluster"="azCluster1" "azureMachinePool"="amp1" "azureMachinePoolMachine"="ampm1" "cluster"="cluster1" "machinePool"="mp1" "namespace"="default"
=== RUN   TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_delete
I0923 20:39:13.612581   47332 azuremachinepoolmachine_controller.go:311]  "msg"="Handling deleted AzureMachinePoolMachine" "AzureCluster"="azCluster1" "azureMachinePool"="amp1" "azureMachinePoolMachine"="ampm1" "cluster"="cluster1" "machinePool"="mp1" "namespace"="default"
--- PASS: TestAzureMachinePoolMachineReconciler_Reconcile (0.01s)
    --- PASS: TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_reconcile (0.01s)
    --- PASS: TestAzureMachinePoolMachineReconciler_Reconcile/should_successfully_delete (0.00s)
=== RUN   TestIsAgentPoolVMSSNotFoundError
=== RUN   TestIsAgentPoolVMSSNotFoundError/WithANotFoundError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/WithANotFoundError
=== RUN   TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError
=== RUN   TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError
=== RUN   TestIsAgentPoolVMSSNotFoundError/NilError
=== PAUSE TestIsAgentPoolVMSSNotFoundError/NilError
=== CONT  TestIsAgentPoolVMSSNotFoundError/WithANotFoundError
=== CONT  TestIsAgentPoolVMSSNotFoundError/NilError
=== CONT  TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError
=== CONT  TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError
--- PASS: TestIsAgentPoolVMSSNotFoundError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/WithANotFoundError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/NilError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/NotTheRightKindOfError (0.00s)
    --- PASS: TestIsAgentPoolVMSSNotFoundError/WithAWrappedNotFoundError (0.00s)
=== RUN   TestAzureClusterToAzureMachinePoolsMapper
--- PASS: TestAzureClusterToAzureMachinePoolsMapper (0.00s)
=== RUN   TestAzureManagedClusterToAzureManagedMachinePoolsMapper
--- PASS: TestAzureManagedClusterToAzureManagedMachinePoolsMapper (0.00s)
=== RUN   TestAzureManagedControlPlaneToAzureManagedMachinePoolsMapper
--- PASS: TestAzureManagedControlPlaneToAzureManagedMachinePoolsMapper (0.00s)
=== RUN   TestMachinePoolToAzureManagedControlPlaneMapFuncSuccess
--- PASS: TestMachinePoolToAzureManagedControlPlaneMapFuncSuccess (0.00s)
=== RUN   TestMachinePoolToAzureManagedControlPlaneMapFuncFailure
--- PASS: TestMachinePoolToAzureManagedControlPlaneMapFuncFailure (0.00s)
=== RUN   TestAzureManagedClusterToAzureManagedControlPlaneMapper
--- PASS: TestAzureManagedClusterToAzureManagedControlPlaneMapper (0.00s)
=== RUN   TestAzureManagedControlPlaneToAzureManagedClusterMapper
--- PASS: TestAzureManagedControlPlaneToAzureManagedClusterMapper (0.00s)
=== RUN   Test_MachinePoolToInfrastructureMapFunc
=== RUN   Test_MachinePoolToInfrastructureMapFunc/MachinePoolToAzureMachinePool
=== RUN   Test_MachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef
=== RUN   Test_MachinePoolToInfrastructureMapFunc/NotAMachinePool
--- PASS: Test_MachinePoolToInfrastructureMapFunc (0.00s)
    --- PASS: Test_MachinePoolToInfrastructureMapFunc/MachinePoolToAzureMachinePool (0.00s)
    --- PASS: Test_MachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef (0.00s)
    --- PASS: Test_MachinePoolToInfrastructureMapFunc/NotAMachinePool (0.00s)
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolToAzureManagedMachinePool
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef
=== RUN   Test_ManagedMachinePoolToInfrastructureMapFunc/NotAMachinePool
--- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc (0.00s)
    --- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolToAzureManagedMachinePool (0.00s)
    --- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc/MachinePoolWithoutMatchingInfraRef (0.00s)
    --- PASS: Test_ManagedMachinePoolToInfrastructureMapFunc/NotAMachinePool (0.00s)
=== RUN   Test_azureClusterToAzureMachinePoolsFunc
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs
=== RUN   Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs
=== PAUSE Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist
=== CONT  Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs
--- PASS: Test_azureClusterToAzureMachinePoolsFunc (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/NotAnAzureCluster (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterDoesNotExist (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsButNoInfraRefs (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsButDoesNotHaveMachinePools (0.00s)
    --- PASS: Test_azureClusterToAzureMachinePoolsFunc/AzureClusterExistsWithMachinePoolsWithOneInfraRefs (0.00s)
=== RUN   TestAPIs
Running Suite: Controller Suite
===============================
Random Seed: 1632409753
Will run 2 of 2 specs

STEP: bootstrapping test environment
Panic [0.019 seconds]
[BeforeSuite] BeforeSuite
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:50

  Test Panicked
  unable to start control plane itself: failed to start the controlplane. retried 5 times: fork/exec /usr/local/kubebuilder/bin/etcd: no such file or directory
  /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105

  Full Stack Trace
  sigs.k8s.io/cluster-api-provider-azure/internal/test/env.NewTestEnvironment()
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/internal/test/env/env.go:105 +0x2d1
  sigs.k8s.io/cluster-api-provider-azure/exp/controllers.glob..func3(0x0)
  	/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:52 +0x4e
  reflect.Value.call({0x25b7980, 0x29e3f58, 0x13}, {0x28fb9b6, 0x4}, {0xc000092f70, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:543 +0x814
  reflect.Value.Call({0x25b7980, 0x29e3f58, 0x0}, {0xc000163770, 0x1, 0x1})
  	/usr/local/Cellar/go/1.17.1/libexec/src/reflect/value.go:339 +0xc5
  github.com/onsi/ginkgo/internal/leafnodes.newRunner.func1(0x0)
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:49 +0x14f
  github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync.func1()
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:86 +0x7a
  created by github.com/onsi/ginkgo/internal/leafnodes.(*runner).runAsync
  	/Users/karuppiahn/go/pkg/mod/github.com/onsi/ginkgo@v1.16.4/internal/leafnodes/runner.go:71 +0xd2
------------------------------


Ran 2 of 0 Specs in 0.019 seconds
FAIL! -- 0 Passed | 2 Failed | 0 Pending | 0 Skipped
You're using deprecated Ginkgo functionality:
=============================================
Ginkgo 2.0 is under active development and will introduce (a small number of) breaking changes.
To learn more, view the migration guide at https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md
To comment, chime in at https://github.com/onsi/ginkgo/issues/711

  You are passing a Done channel to a test node to test asynchronous behavior.  This is deprecated in Ginkgo V2.  Your test will run synchronously and the timeout will be ignored.
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-async-testing
    /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/exp/controllers/suite_test.go:50
  You are using a custom reporter.  Support for custom reporters will likely be removed in V2.  Most users were using them to generate junit or teamcity reports and this functionality will be merged into the core reporter.  In addition, Ginkgo 2.0 will support emitting a JSON-formatted report that users can then manipulate to generate custom reports.

  If this change will be impactful to you please leave a comment on https://github.com/onsi/ginkgo/issues/711
  Learn more at: https://github.com/onsi/ginkgo/blob/v2/docs/MIGRATING_TO_V2.md#removed-custom-reporters

To silence deprecations that can be silenced set the following environment variable:
  ACK_GINKGO_DEPRECATIONS=1.16.4

--- FAIL: TestAPIs (0.02s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/exp/controllers	4.703s
?   	sigs.k8s.io/cluster-api-provider-azure/exp/controllers/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/feature	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/hack/boilerplate/test	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test	[no test files]
=== RUN   TestGetFilePathToCAPICRDs
--- PASS: TestGetFilePathToCAPICRDs (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/env	4.064s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/logentries	[no test files]
=== RUN   TestLogContains
=== RUN   TestLogContains/MatchesCompletely
=== PAUSE TestLogContains/MatchesCompletely
=== RUN   TestLogContains/MatchesWithoutSpecifyingLevel
=== PAUSE TestLogContains/MatchesWithoutSpecifyingLevel
=== RUN   TestLogContains/MatchesWithoutSpecifyingLogFunc
=== PAUSE TestLogContains/MatchesWithoutSpecifyingLogFunc
=== RUN   TestLogContains/MatchesWithoutSpecifyingAllValues
=== PAUSE TestLogContains/MatchesWithoutSpecifyingAllValues
=== CONT  TestLogContains/MatchesCompletely
=== CONT  TestLogContains/MatchesWithoutSpecifyingLogFunc
=== CONT  TestLogContains/MatchesWithoutSpecifyingAllValues
=== CONT  TestLogContains/MatchesWithoutSpecifyingLevel
--- PASS: TestLogContains (0.00s)
    --- PASS: TestLogContains/MatchesWithoutSpecifyingLogFunc (0.00s)
    --- PASS: TestLogContains/MatchesCompletely (0.00s)
    --- PASS: TestLogContains/MatchesWithoutSpecifyingAllValues (0.00s)
    --- PASS: TestLogContains/MatchesWithoutSpecifyingLevel (0.00s)
=== RUN   TestLogContainsEntries
--- PASS: TestLogContainsEntries (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomega	3.767s
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/matchers/gomock	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/mock_log	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/internal/test/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/cloudtest	[no test files]
=== RUN   TestCoalescingReconciler_Reconcile
=== RUN   TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache
=== RUN   TestCoalescingReconciler_Reconcile/should_not_call_upstream_reconciler_if_key_does_exists_in_cache_and_is_not_expired
=== RUN   TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache_and_return_error
--- PASS: TestCoalescingReconciler_Reconcile (0.00s)
    --- PASS: TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache (0.00s)
    --- PASS: TestCoalescingReconciler_Reconcile/should_not_call_upstream_reconciler_if_key_does_exists_in_cache_and_is_not_expired (0.00s)
    --- PASS: TestCoalescingReconciler_Reconcile/should_call_upstream_reconciler_if_key_does_not_exist_in_cache_and_return_error (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing	3.622s
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/coalescing/mocks	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/ot	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/pkg/record	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/test/e2e	[no test files]
=== RUN   TestNew
--- PASS: TestNew (0.00s)
=== RUN   TestCache_Add
--- PASS: TestCache_Add (0.00s)
=== RUN   TestCache_Get
=== RUN   TestCache_Get/NoItemsInCache
=== RUN   TestCache_Get/ExistingItemNotExpired
=== RUN   TestCache_Get/ExistingItemExpired
=== RUN   TestCache_Get/ExistingItemGetAdvancesLastTouch
=== RUN   TestCache_Get/ExistingItemIsNotTTLItem
--- PASS: TestCache_Get (0.00s)
    --- PASS: TestCache_Get/NoItemsInCache (0.00s)
    --- PASS: TestCache_Get/ExistingItemNotExpired (0.00s)
    --- PASS: TestCache_Get/ExistingItemExpired (0.00s)
    --- PASS: TestCache_Get/ExistingItemGetAdvancesLastTouch (0.00s)
    --- PASS: TestCache_Get/ExistingItemIsNotTTLItem (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru	3.866s
?   	sigs.k8s.io/cluster-api-provider-azure/util/cache/ttllru/mocks	[no test files]
=== RUN   TestGet
--- PASS: TestGet (0.00s)
=== RUN   TestHas
--- PASS: TestHas (0.00s)
=== RUN   TestSet
=== RUN   TestSet/Set_adds_a_future
=== RUN   TestSet/Set_adds_more_futures
=== RUN   TestSet/Set_does_not_duplicate_existing_future
=== RUN   TestSet/Set_updates_an_existing_future
--- PASS: TestSet (0.00s)
    --- PASS: TestSet/Set_adds_a_future (0.00s)
    --- PASS: TestSet/Set_adds_more_futures (0.00s)
    --- PASS: TestSet/Set_does_not_duplicate_existing_future (0.00s)
    --- PASS: TestSet/Set_updates_an_existing_future (0.00s)
=== RUN   TestDelete
=== RUN   TestDelete/Delete_removes_a_future
=== RUN   TestDelete/Delete_does_nothing_if_the_future_does_not_exist
--- PASS: TestDelete (0.00s)
    --- PASS: TestDelete/Delete_removes_a_future (0.00s)
    --- PASS: TestDelete/Delete_does_nothing_if_the_future_does_not_exist (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/futures	5.116s
?   	sigs.k8s.io/cluster-api-provider-azure/util/generators	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/identity	[no test files]
=== RUN   TestDefaultedTimeout
=== RUN   TestDefaultedTimeout/WithZeroValueDefaults
=== PAUSE TestDefaultedTimeout/WithZeroValueDefaults
=== RUN   TestDefaultedTimeout/WithRealValue
=== PAUSE TestDefaultedTimeout/WithRealValue
=== RUN   TestDefaultedTimeout/WithNegativeValue
=== PAUSE TestDefaultedTimeout/WithNegativeValue
=== CONT  TestDefaultedTimeout/WithZeroValueDefaults
=== CONT  TestDefaultedTimeout/WithNegativeValue
=== CONT  TestDefaultedTimeout/WithRealValue
--- PASS: TestDefaultedTimeout (0.00s)
    --- PASS: TestDefaultedTimeout/WithZeroValueDefaults (0.00s)
    --- PASS: TestDefaultedTimeout/WithNegativeValue (0.00s)
    --- PASS: TestDefaultedTimeout/WithRealValue (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/reconciler	4.090s
?   	sigs.k8s.io/cluster-api-provider-azure/util/slice	[no test files]
=== RUN   TestGenerateSSHKey
--- PASS: TestGenerateSSHKey (0.89s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/ssh	4.811s
=== RUN   TestGetNamespace
=== RUN   TestGetNamespace/env_var_set_to_custom_namespace
=== RUN   TestGetNamespace/env_var_empty
--- PASS: TestGetNamespace (0.00s)
    --- PASS: TestGetNamespace/env_var_set_to_custom_namespace (0.00s)
    --- PASS: TestGetNamespace/env_var_empty (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/util/system	4.830s
?   	sigs.k8s.io/cluster-api-provider-azure/util/tele	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/util/webhook	[no test files]
?   	sigs.k8s.io/cluster-api-provider-azure/version	[no test files]
FAIL
cluster-api-provider-azure $
```

TODO

- Fix mock for GroupScope - since GroupScope interface has been update. Error to fix -

```bash
azure/services/groups/groups_test.go:115:5: cannot use scopeMock (type *mock_groups.MockGroupScope) as type GroupScope in field value:
	*mock_groups.MockGroupScope does not implement GroupScope (missing AdditionalTags method)
azure/services/groups/groups_test.go:249:5: cannot use scopeMock (type *mock_groups.MockGroupScope) as type GroupScope in field value:
	*mock_groups.MockGroupScope does not implement GroupScope (missing AdditionalTags method)
```

- Tests for the change
  - Existing tests - should I add mocks for the

---

```bash
cluster-api-provider-azure $ ./hack/tools/bin/mockgen -version
v1.6.0
cluster-api-provider-azure $ ./hack/tools/bin/mockgen
mockgen has two modes of operation: source and reflect.

Source mode generates mock interfaces from a source file.
It is enabled by using the -source flag. Other flags that
may be useful in this mode are -imports and -aux_files.
Example:
	mockgen -source=foo.go [other options]

Reflect mode generates mock interfaces by building a program
that uses reflection to understand interfaces. It is enabled
by passing two non-flag arguments: an import path, and a
comma-separated list of symbols.
Example:
	mockgen database/sql/driver Conn,Driver

  -aux_files string
    	(source mode) Comma-separated pkg=path pairs of auxiliary Go source files.
  -build_flags string
    	(reflect mode) Additional flags for go build.
  -copyright_file string
    	Copyright file used to add copyright header
  -debug_parser
    	Print out parser results only.
  -destination string
    	Output file; defaults to stdout.
  -exec_only string
    	(reflect mode) If set, execute this reflection program.
  -imports string
    	(source mode) Comma-separated name=path pairs of explicit imports to use.
  -mock_names string
    	Comma-separated interfaceName=mockName pairs of explicit mock names to use. Mock names default to 'Mock'+ interfaceName suffix.
  -package string
    	Package of the generated code; defaults to the package of the input with a 'mock_' prefix.
  -prog_only
    	(reflect mode) Only generate the reflection program; write it to stdout and exit.
  -self_package string
    	The full package import path for the generated code. The purpose of this flag is to prevent import cycles in the generated code by trying to include its own package. This can happen if the mock's package is set to one of its inputs (usually the main one) and the output is stdio so mockgen cannot detect the final output package. Setting this flag will then tell mockgen which import to exclude.
  -source string
    	(source mode) Input Go source file; enables source mode.
  -version
    	Print version.
  -write_package_comment
    	Writes package documentation comment (godoc) if true. (default true)
2021/09/23 20:59:59 Expected exactly two arguments
cluster-api-provider-azure $ ./hack/tools/bin/mockgen -source azure/services/groups/groups.go
2021/09/23 21:02:47 Loading input failed: azure/services/groups/groups.go:46:2: could not parse package github.com/go-logr/logr: go/build: go list github.com/go-logr/logr: exit status 2
go: cannot find GOROOT directory: /usr/local/Cellar/go/1.17/libexec

cluster-api-provider-azure $ go env GOROOT
/usr/local/Cellar/go/1.17.1/libexec
cluster-api-provider-azure $ source ~/.bash_profile
cluster-api-provider-azure $ go env GOROOT
/usr/local/Cellar/go/1.17.1/libexec
cluster-api-provider-azure $ ./hack/tools/bin/mockgen -source azure/services/groups/groups.go
2021/09/23 21:03:18 Loading input failed: azure/services/groups/groups.go:46:2: could not parse package github.com/go-logr/logr: go/build: go list github.com/go-logr/logr: exit status 2
go: cannot find GOROOT directory: /usr/local/Cellar/go/1.17/libexec

cluster-api-provider-azure $ go list github.com/go-logr/logr
github.com/go-logr/logr
cluster-api-provider-azure $ make hack/tools/bin/mockgen
mockgen         mockgen-v1.6.0
cluster-api-provider-azure $ make hack/tools/bin/mockgen-v1.6.0
make: Nothing to be done for `hack/tools/bin/mockgen-v1.6.0'.
cluster-api-provider-azure $ rm -rfv hack/tools/bin/mockgen-v1.6.0
hack/tools/bin/mockgen-v1.6.0
cluster-api-provider-azure $ rm -rfv hack/tools/bin/mockgen
hack/tools/bin/mockgen
cluster-api-provider-azure $ make hack/tools/bin/mockgen-v1.6.0
make: *** No rule to make target `hack/tools/bin/mockgen-v1.6.0'.  Stop.
cluster-api-provider-azure $ make hack/tools/bin/mockgen-v1.6.0
cluster-api-provider-azure $ pwd
/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure
cluster-api-provider-azure $ make /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/mockgen-v1.6.0
GOBIN=/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin ./scripts/go_install.sh github.com/golang/mock/mockgen mockgen v1.6.0
rm: /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/hack/tools/bin/mockgen*: No such file or directory
go: creating new go.mod: module fake/mod
go get: installing executables with 'go get' in module mode is deprecated.
	To adjust and download dependencies of the current module, use 'go get -d'.
	To install using requirements of the current module, use 'go install'.
	To install ignoring the current module, use 'go install' with a version,
	like 'go install example.com/cmd@latest'.
	For more information, see https://golang.org/doc/go-get-install-deprecation
	or run 'go help get' or 'go help install'.
go get: added github.com/golang/mock v1.6.0
go get: added golang.org/x/mod v0.4.2
go get: added golang.org/x/sys v0.0.0-20210510120138-977fb7262007
go get: added golang.org/x/tools v0.1.1
go get: added golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1
cluster-api-provider-azure $ ./hack/tools/bin/mockgen
mockgen         mockgen-v1.6.0
cluster-api-provider-azure $ ./hack/tools/bin/mockgen
cluster-api-provider-azure $ ./hack/tools/bin/mockgen -source azure/services/groups/groups.go
// Code generated by MockGen. DO NOT EDIT.
// Source: azure/services/groups/groups.go

// Package mock_groups is a generated GoMock package.
package mock_groups

import (
	reflect "reflect"

	autorest "github.com/Azure/go-autorest/autorest"
	logr "github.com/go-logr/logr"
	gomock "github.com/golang/mock/gomock"
	v1alpha4 "sigs.k8s.io/cluster-api-provider-azure/api/v1alpha4"
	azure "sigs.k8s.io/cluster-api-provider-azure/azure"
	v1alpha40 "sigs.k8s.io/cluster-api/api/v1alpha4"
)

// MockGroupScope is a mock of GroupScope interface.
type MockGroupScope struct {
	ctrl     *gomock.Controller
	recorder *MockGroupScopeMockRecorder
}

// MockGroupScopeMockRecorder is the mock recorder for MockGroupScope.
type MockGroupScopeMockRecorder struct {
	mock *MockGroupScope
}

// NewMockGroupScope creates a new mock instance.
func NewMockGroupScope(ctrl *gomock.Controller) *MockGroupScope {
	mock := &MockGroupScope{ctrl: ctrl}
	mock.recorder = &MockGroupScopeMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockGroupScope) EXPECT() *MockGroupScopeMockRecorder {
	return m.recorder
}

// AdditionalTags mocks base method.
func (m *MockGroupScope) AdditionalTags() v1alpha4.Tags {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AdditionalTags")
	ret0, _ := ret[0].(v1alpha4.Tags)
	return ret0
}

// AdditionalTags indicates an expected call of AdditionalTags.
func (mr *MockGroupScopeMockRecorder) AdditionalTags() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AdditionalTags", reflect.TypeOf((*MockGroupScope)(nil).AdditionalTags))
}

// AnnotationJSON mocks base method.
func (m *MockGroupScope) AnnotationJSON(arg0 string) (map[string]interface{}, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "AnnotationJSON", arg0)
	ret0, _ := ret[0].(map[string]interface{})
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// AnnotationJSON indicates an expected call of AnnotationJSON.
func (mr *MockGroupScopeMockRecorder) AnnotationJSON(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "AnnotationJSON", reflect.TypeOf((*MockGroupScope)(nil).AnnotationJSON), arg0)
}

// Authorizer mocks base method.
func (m *MockGroupScope) Authorizer() autorest.Authorizer {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Authorizer")
	ret0, _ := ret[0].(autorest.Authorizer)
	return ret0
}

// Authorizer indicates an expected call of Authorizer.
func (mr *MockGroupScopeMockRecorder) Authorizer() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Authorizer", reflect.TypeOf((*MockGroupScope)(nil).Authorizer))
}

// BaseURI mocks base method.
func (m *MockGroupScope) BaseURI() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "BaseURI")
	ret0, _ := ret[0].(string)
	return ret0
}

// BaseURI indicates an expected call of BaseURI.
func (mr *MockGroupScopeMockRecorder) BaseURI() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "BaseURI", reflect.TypeOf((*MockGroupScope)(nil).BaseURI))
}

// ClientID mocks base method.
func (m *MockGroupScope) ClientID() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ClientID")
	ret0, _ := ret[0].(string)
	return ret0
}

// ClientID indicates an expected call of ClientID.
func (mr *MockGroupScopeMockRecorder) ClientID() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ClientID", reflect.TypeOf((*MockGroupScope)(nil).ClientID))
}

// ClientSecret mocks base method.
func (m *MockGroupScope) ClientSecret() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ClientSecret")
	ret0, _ := ret[0].(string)
	return ret0
}

// ClientSecret indicates an expected call of ClientSecret.
func (mr *MockGroupScopeMockRecorder) ClientSecret() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ClientSecret", reflect.TypeOf((*MockGroupScope)(nil).ClientSecret))
}

// CloudEnvironment mocks base method.
func (m *MockGroupScope) CloudEnvironment() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CloudEnvironment")
	ret0, _ := ret[0].(string)
	return ret0
}

// CloudEnvironment indicates an expected call of CloudEnvironment.
func (mr *MockGroupScopeMockRecorder) CloudEnvironment() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CloudEnvironment", reflect.TypeOf((*MockGroupScope)(nil).CloudEnvironment))
}

// ClusterName mocks base method.
func (m *MockGroupScope) ClusterName() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ClusterName")
	ret0, _ := ret[0].(string)
	return ret0
}

// ClusterName indicates an expected call of ClusterName.
func (mr *MockGroupScopeMockRecorder) ClusterName() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ClusterName", reflect.TypeOf((*MockGroupScope)(nil).ClusterName))
}

// DeleteLongRunningOperationState mocks base method.
func (m *MockGroupScope) DeleteLongRunningOperationState(arg0, arg1 string) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "DeleteLongRunningOperationState", arg0, arg1)
}

// DeleteLongRunningOperationState indicates an expected call of DeleteLongRunningOperationState.
func (mr *MockGroupScopeMockRecorder) DeleteLongRunningOperationState(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteLongRunningOperationState", reflect.TypeOf((*MockGroupScope)(nil).DeleteLongRunningOperationState), arg0, arg1)
}

// Enabled mocks base method.
func (m *MockGroupScope) Enabled() bool {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Enabled")
	ret0, _ := ret[0].(bool)
	return ret0
}

// Enabled indicates an expected call of Enabled.
func (mr *MockGroupScopeMockRecorder) Enabled() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Enabled", reflect.TypeOf((*MockGroupScope)(nil).Enabled))
}

// Error mocks base method.
func (m *MockGroupScope) Error(err error, msg string, keysAndValues ...interface{}) {
	m.ctrl.T.Helper()
	varargs := []interface{}{err, msg}
	for _, a := range keysAndValues {
		varargs = append(varargs, a)
	}
	m.ctrl.Call(m, "Error", varargs...)
}

// Error indicates an expected call of Error.
func (mr *MockGroupScopeMockRecorder) Error(err, msg interface{}, keysAndValues ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{err, msg}, keysAndValues...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Error", reflect.TypeOf((*MockGroupScope)(nil).Error), varargs...)
}

// GetLongRunningOperationState mocks base method.
func (m *MockGroupScope) GetLongRunningOperationState(arg0, arg1 string) *v1alpha4.Future {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetLongRunningOperationState", arg0, arg1)
	ret0, _ := ret[0].(*v1alpha4.Future)
	return ret0
}

// GetLongRunningOperationState indicates an expected call of GetLongRunningOperationState.
func (mr *MockGroupScopeMockRecorder) GetLongRunningOperationState(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetLongRunningOperationState", reflect.TypeOf((*MockGroupScope)(nil).GetLongRunningOperationState), arg0, arg1)
}

// GroupSpec mocks base method.
func (m *MockGroupScope) GroupSpec() azure.ResourceSpecGetter {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GroupSpec")
	ret0, _ := ret[0].(azure.ResourceSpecGetter)
	return ret0
}

// GroupSpec indicates an expected call of GroupSpec.
func (mr *MockGroupScopeMockRecorder) GroupSpec() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GroupSpec", reflect.TypeOf((*MockGroupScope)(nil).GroupSpec))
}

// HashKey mocks base method.
func (m *MockGroupScope) HashKey() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "HashKey")
	ret0, _ := ret[0].(string)
	return ret0
}

// HashKey indicates an expected call of HashKey.
func (mr *MockGroupScopeMockRecorder) HashKey() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "HashKey", reflect.TypeOf((*MockGroupScope)(nil).HashKey))
}

// Info mocks base method.
func (m *MockGroupScope) Info(msg string, keysAndValues ...interface{}) {
	m.ctrl.T.Helper()
	varargs := []interface{}{msg}
	for _, a := range keysAndValues {
		varargs = append(varargs, a)
	}
	m.ctrl.Call(m, "Info", varargs...)
}

// Info indicates an expected call of Info.
func (mr *MockGroupScopeMockRecorder) Info(msg interface{}, keysAndValues ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{msg}, keysAndValues...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Info", reflect.TypeOf((*MockGroupScope)(nil).Info), varargs...)
}

// SetLongRunningOperationState mocks base method.
func (m *MockGroupScope) SetLongRunningOperationState(arg0 *v1alpha4.Future) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "SetLongRunningOperationState", arg0)
}

// SetLongRunningOperationState indicates an expected call of SetLongRunningOperationState.
func (mr *MockGroupScopeMockRecorder) SetLongRunningOperationState(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetLongRunningOperationState", reflect.TypeOf((*MockGroupScope)(nil).SetLongRunningOperationState), arg0)
}

// SubscriptionID mocks base method.
func (m *MockGroupScope) SubscriptionID() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SubscriptionID")
	ret0, _ := ret[0].(string)
	return ret0
}

// SubscriptionID indicates an expected call of SubscriptionID.
func (mr *MockGroupScopeMockRecorder) SubscriptionID() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SubscriptionID", reflect.TypeOf((*MockGroupScope)(nil).SubscriptionID))
}

// TenantID mocks base method.
func (m *MockGroupScope) TenantID() string {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "TenantID")
	ret0, _ := ret[0].(string)
	return ret0
}

// TenantID indicates an expected call of TenantID.
func (mr *MockGroupScopeMockRecorder) TenantID() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "TenantID", reflect.TypeOf((*MockGroupScope)(nil).TenantID))
}

// UpdateAnnotationJSON mocks base method.
func (m *MockGroupScope) UpdateAnnotationJSON(arg0 string, arg1 map[string]interface{}) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateAnnotationJSON", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateAnnotationJSON indicates an expected call of UpdateAnnotationJSON.
func (mr *MockGroupScopeMockRecorder) UpdateAnnotationJSON(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateAnnotationJSON", reflect.TypeOf((*MockGroupScope)(nil).UpdateAnnotationJSON), arg0, arg1)
}

// UpdateDeleteStatus mocks base method.
func (m *MockGroupScope) UpdateDeleteStatus(arg0 v1alpha40.ConditionType, arg1 string, arg2 error) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "UpdateDeleteStatus", arg0, arg1, arg2)
}

// UpdateDeleteStatus indicates an expected call of UpdateDeleteStatus.
func (mr *MockGroupScopeMockRecorder) UpdateDeleteStatus(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateDeleteStatus", reflect.TypeOf((*MockGroupScope)(nil).UpdateDeleteStatus), arg0, arg1, arg2)
}

// UpdatePatchStatus mocks base method.
func (m *MockGroupScope) UpdatePatchStatus(arg0 v1alpha40.ConditionType, arg1 string, arg2 error) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "UpdatePatchStatus", arg0, arg1, arg2)
}

// UpdatePatchStatus indicates an expected call of UpdatePatchStatus.
func (mr *MockGroupScopeMockRecorder) UpdatePatchStatus(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdatePatchStatus", reflect.TypeOf((*MockGroupScope)(nil).UpdatePatchStatus), arg0, arg1, arg2)
}

// UpdatePutStatus mocks base method.
func (m *MockGroupScope) UpdatePutStatus(arg0 v1alpha40.ConditionType, arg1 string, arg2 error) {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "UpdatePutStatus", arg0, arg1, arg2)
}

// UpdatePutStatus indicates an expected call of UpdatePutStatus.
func (mr *MockGroupScopeMockRecorder) UpdatePutStatus(arg0, arg1, arg2 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdatePutStatus", reflect.TypeOf((*MockGroupScope)(nil).UpdatePutStatus), arg0, arg1, arg2)
}

// V mocks base method.
func (m *MockGroupScope) V(level int) logr.Logger {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "V", level)
	ret0, _ := ret[0].(logr.Logger)
	return ret0
}

// V indicates an expected call of V.
func (mr *MockGroupScopeMockRecorder) V(level interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "V", reflect.TypeOf((*MockGroupScope)(nil).V), level)
}

// WithName mocks base method.
func (m *MockGroupScope) WithName(name string) logr.Logger {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WithName", name)
	ret0, _ := ret[0].(logr.Logger)
	return ret0
}

// WithName indicates an expected call of WithName.
func (mr *MockGroupScopeMockRecorder) WithName(name interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithName", reflect.TypeOf((*MockGroupScope)(nil).WithName), name)
}

// WithValues mocks base method.
func (m *MockGroupScope) WithValues(keysAndValues ...interface{}) logr.Logger {
	m.ctrl.T.Helper()
	varargs := []interface{}{}
	for _, a := range keysAndValues {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "WithValues", varargs...)
	ret0, _ := ret[0].(logr.Logger)
	return ret0
}

// WithValues indicates an expected call of WithValues.
func (mr *MockGroupScopeMockRecorder) WithValues(keysAndValues ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithValues", reflect.TypeOf((*MockGroupScope)(nil).WithValues), keysAndValues...)
}
cluster-api-provider-azure $ ./hack/tools/bin/mockgen -source azure/services/groups/groups.go -w
flag provided but not defined: -w
mockgen has two modes of operation: source and reflect.

Source mode generates mock interfaces from a source file.
It is enabled by using the -source flag. Other flags that
may be useful in this mode are -imports and -aux_files.
Example:
	mockgen -source=foo.go [other options]

Reflect mode generates mock interfaces by building a program
that uses reflection to understand interfaces. It is enabled
by passing two non-flag arguments: an import path, and a
comma-separated list of symbols.
Example:
	mockgen database/sql/driver Conn,Driver

  -aux_files string
    	(source mode) Comma-separated pkg=path pairs of auxiliary Go source files.
  -build_flags string
    	(reflect mode) Additional flags for go build.
  -copyright_file string
    	Copyright file used to add copyright header
  -debug_parser
    	Print out parser results only.
  -destination string
    	Output file; defaults to stdout.
  -exec_only string
    	(reflect mode) If set, execute this reflection program.
  -imports string
    	(source mode) Comma-separated name=path pairs of explicit imports to use.
  -mock_names string
    	Comma-separated interfaceName=mockName pairs of explicit mock names to use. Mock names default to 'Mock'+ interfaceName suffix.
  -package string
    	Package of the generated code; defaults to the package of the input with a 'mock_' prefix.
  -prog_only
    	(reflect mode) Only generate the reflection program; write it to stdout and exit.
  -self_package string
    	The full package import path for the generated code. The purpose of this flag is to prevent import cycles in the generated code by trying to include its own package. This can happen if the mock's package is set to one of its inputs (usually the main one) and the output is stdio so mockgen cannot detect the final output package. Setting this flag will then tell mockgen which import to exclude.
  -source string
    	(source mode) Input Go source file; enables source mode.
  -version
    	Print version.
  -write_package_comment
    	Writes package documentation comment (godoc) if true. (default true)
cluster-api-provider-azure $ ./hack/tools/bin/mockgen -source azure/services/groups/groups.go | pbcopy
cluster-api-provider-azure $
```

---

```bash
cluster-api-provider-azure $ gst
On branch fix-1696
Your branch is up to date with 'origin/fix-1696'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   azure/services/groups/mock_groups/groups_mock.go

cluster-api-provider-azure $ go test -v sigs.k8s.io/cluster-api-provider-azure/azure/services/groups
=== RUN   TestReconcileGroups
=== RUN   TestReconcileGroups/create_group_succeeds
=== PAUSE TestReconcileGroups/create_group_succeeds
=== RUN   TestReconcileGroups/create_resource_group_fails
=== PAUSE TestReconcileGroups/create_resource_group_fails
=== CONT  TestReconcileGroups/create_group_succeeds
=== CONT  TestReconcileGroups/create_resource_group_fails
I0923 21:08:41.830358   54047 async.go:76]  "msg"="creating resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0923 21:08:41.830358   54047 async.go:76]  "msg"="creating resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0923 21:08:41.830597   54047 async.go:91]  "msg"="successfully created resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
=== CONT  TestReconcileGroups/create_group_succeeds
    groups.go:165: Unexpected call to *mock_groups.MockGroupScope.GroupSpec([]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/groups/groups.go:165 because:
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/groups/groups_test.go:82 has already been called the max number of times
--- FAIL: TestReconcileGroups (0.00s)
    --- PASS: TestReconcileGroups/create_resource_group_fails (0.00s)
    --- FAIL: TestReconcileGroups/create_group_succeeds (0.00s)
=== RUN   TestDeleteGroups
=== RUN   TestDeleteGroups/long_running_delete_operation_is_done
=== PAUSE TestDeleteGroups/long_running_delete_operation_is_done
=== RUN   TestDeleteGroups/long_running_delete_operation_is_not_done
=== PAUSE TestDeleteGroups/long_running_delete_operation_is_not_done
=== RUN   TestDeleteGroups/resource_group_is_not_managed_by_capz
=== PAUSE TestDeleteGroups/resource_group_is_not_managed_by_capz
=== RUN   TestDeleteGroups/fail_to_check_if_resource_group_is_managed
=== PAUSE TestDeleteGroups/fail_to_check_if_resource_group_is_managed
=== RUN   TestDeleteGroups/resource_group_doesn't_exist
=== PAUSE TestDeleteGroups/resource_group_doesn't_exist
=== RUN   TestDeleteGroups/error_occurs_when_deleting_resource_group
=== PAUSE TestDeleteGroups/error_occurs_when_deleting_resource_group
=== RUN   TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group
=== PAUSE TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group
=== RUN   TestDeleteGroups/delete_the_resource_group_successfully
=== PAUSE TestDeleteGroups/delete_the_resource_group_successfully
=== CONT  TestDeleteGroups/long_running_delete_operation_is_done
=== CONT  TestDeleteGroups/resource_group_doesn't_exist
=== CONT  TestDeleteGroups/resource_group_is_not_managed_by_capz
=== CONT  TestDeleteGroups/fail_to_check_if_resource_group_is_managed
=== CONT  TestDeleteGroups/long_running_delete_operation_is_not_done
=== CONT  TestDeleteGroups/error_occurs_when_deleting_resource_group
=== CONT  TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group
I0923 21:08:41.831017   54047 groups.go:150]  "msg"="Should not delete resource group in unmanaged mode"
=== CONT  TestDeleteGroups/delete_the_resource_group_successfully
I0923 21:08:41.831095   54047 async.go:59]  "msg"="long running operation has completed"  "resource"="test-group" "service"="group"
I0923 21:08:41.831098   54047 async.go:107]  "msg"="deleting resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0923 21:08:41.831101   54047 async.go:107]  "msg"="deleting resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0923 21:08:41.831155   54047 async.go:54]  "msg"="long running operation is still ongoing"  "resource"="test-group" "service"="group"
I0923 21:08:41.831246   54047 async.go:107]  "msg"="deleting resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
I0923 21:08:41.831272   54047 async.go:125]  "msg"="successfully deleted resource"  "resource"="test-group" "resourceGroup"="test-group" "service"="group"
--- PASS: TestDeleteGroups (0.00s)
    --- PASS: TestDeleteGroups/resource_group_doesn't_exist (0.00s)
    --- PASS: TestDeleteGroups/fail_to_check_if_resource_group_is_managed (0.00s)
    --- PASS: TestDeleteGroups/resource_group_is_not_managed_by_capz (0.00s)
    --- PASS: TestDeleteGroups/long_running_delete_operation_is_done (0.00s)
    --- PASS: TestDeleteGroups/error_occurs_when_deleting_resource_group (0.00s)
    --- PASS: TestDeleteGroups/context_deadline_exceeded_while_deleting_resource_group (0.00s)
    --- PASS: TestDeleteGroups/long_running_delete_operation_is_not_done (0.00s)
    --- PASS: TestDeleteGroups/delete_the_resource_group_successfully (0.00s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/groups	0.512s
FAIL
cluster-api-provider-azure $
```

---

Requirements

- [Critical-Requirement] Apart from CAPZ, there might be other systems working with tags of resources for various reasons. CAPZ should only manage the tags that it owns and nothing more and nothing less. No overwriting of data written by others unless the data is managed by CAPZ
- In this PR we are considering changes for managing tags of Resource Groups alone, but in the future we will be managing the tags of other resources too and it should be easy to do so
- We want only managed / owned resources to be manipulated as part of updating tags

---

[TODO]

- Try the Tags API with dummy resource group to understand complete behavior of the API - the create or update API vs the update at scope API [DONE]
- Use get-at-scope tags API in tags.go service to check if resource is owned or not! [DONE]
- Convert the tags.go service to use a update-at-scope API instead of a GET and create-or-update API to update tags to prevent race condition. It can use get for checking managed / not-managed alone. We also need to use delete tags too using update-at-scope API for deletions! This assumes that no one changed or removed the owned tag value after the GET and just before our updates
- Discuss about how delete can be done by comparing desired tags vs last applied tags. And how update can be done by comparing desired tags vs current tags from get-at-scope
- Rename `created` to `createdOrUpdated` in code, test code `expectedCreatedOrUpdated` etc? Too verbose name, so leave it for now [DONE]

---

Test cases for tag service

- Managed resource? Yes, No - wrote the test now
- Tags changed? Yes, No

  - Yes Tags changed cases
    - Tags Created - already test was written
    - Tags Updated - already test was written - with error cases, no happy path
    - Tags Deleted - wrote the test now
    - Tags Updated and Deleted - no test
    - Tags Created and Deleted - no test
    - Tags Created and Updated - no test
    - Tags Created, Updated and Deleted - no test
  - No Tags changed - already test was written

- Errors
  - Error while getting current resource tags from Azure - already test was written
  - Error while getting k8s annotation JSON - no test
  - Error while creating-or-updating resource tags to Azure - already test was written
  - Error while updating k8s annotation JSON - no test

---

```bash
Running tool: /usr/local/bin/go test -timeout 30s -tags e2e -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags

I0928 11:37:51.308712   29159 tags.go:81]  "msg"="Updating tags"
I0928 11:37:51.308866   29159 tags.go:98]  "msg"="successfully updated tags"
I0928 11:37:51.308899   29159 tags.go:81]  "msg"="Updating tags"
I0928 11:37:51.309096   29159 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 11:37:51.309315   29159 tags.go:81]  "msg"="Updating tags"
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/other/scope {{<nil>} <nil> <nil> <nil> 0xc000482188}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc000482188}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc000482100}
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 1.
            Got: /sub/123/other/scope
            Want: is equal to /sub/123/fake/scope
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc000482100}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/error_updating_tags (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc000482300}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:157 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc000482300}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc0004822d0}
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0004822d0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:157
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.262s
FAIL
```

```bash
Running tool: /usr/local/bin/go test -timeout 30s -tags e2e -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags

--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:54: wrong type of argument 0 to Return for *mock_tags.MockTagScope.TagsSpecs: [2]azure.TagsSpec is not assignable to []azure.TagsSpec [/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:54]
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.TagsSpecs() /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:54
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:105: wrong type of argument 0 to Return for *mock_tags.MockTagScope.TagsSpecs: [1]azure.TagsSpec is not assignable to []azure.TagsSpec [/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:105]
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.TagsSpecs() /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:105
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/error_getting_existing_tags (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:125: wrong type of argument 0 to Return for *mock_tags.MockTagScope.TagsSpecs: [1]azure.TagsSpec is not assignable to []azure.TagsSpec [/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:125]
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.TagsSpecs() /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:125
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/error_updating_tags (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:145: wrong type of argument 0 to Return for *mock_tags.MockTagScope.TagsSpecs: [1]azure.TagsSpec is not assignable to []azure.TagsSpec [/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:145]
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.TagsSpecs() /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:145
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/tags_unchanged (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:173: wrong type of argument 0 to Return for *mock_tags.MockTagScope.TagsSpecs: [1]azure.TagsSpec is not assignable to []azure.TagsSpec [/Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:173]
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.TagsSpecs() /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:173
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.269s
FAIL
```

```bash
cluster-api-provider-azure $ go test -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
I0928 11:43:55.330223   31802 tags.go:81]  "msg"="Updating tags"
I0928 11:43:55.330431   31802 tags.go:98]  "msg"="successfully updated tags"
I0928 11:43:55.330451   31802 tags.go:81]  "msg"="Updating tags"
I0928 11:43:55.330709   31802 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 11:43:55.330867   31802 tags.go:81]  "msg"="Updating tags"
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/other/scope {{<nil>} <nil> <nil> <nil> 0xc000702218}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc000702218}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc000702178}
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 1.
            Got: /sub/123/other/scope
            Want: is equal to /sub/123/fake/scope
        controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc000702178}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
        controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
        controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/error_updating_tags (0.00s)
        tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc0007023d0}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:157 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc0007023d0}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc0007023a0}
        controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0007023a0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:157
        controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.496s
FAIL
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ go test -v -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags_for_managed_resources
I0928 11:44:04.137335   31840 tags.go:81]  "msg"="Updating tags"
I0928 11:44:04.137530   31840 tags.go:98]  "msg"="successfully updated tags"
I0928 11:44:04.137553   31840 tags.go:81]  "msg"="Updating tags"
    tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/other/scope {{<nil>} <nil> <nil> <nil> 0xc000434168}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 2.
        Got: {{<nil>} <nil> <nil> <nil> 0xc000434168}
        Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc0004340e0}
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 1.
        Got: /sub/123/other/scope
        Want: is equal to /sub/123/fake/scope
    controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0004340e0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
    controller.go:266: aborting test due to missing call(s)
=== RUN   TestReconcileTags/do_not_create_tags_for_unmanaged_resources
I0928 11:44:04.137780   31840 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
=== RUN   TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
I0928 11:44:04.137925   31840 tags.go:81]  "msg"="Updating tags"
    tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc000434420}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:157 doesn't match the argument at index 2.
        Got: {{<nil>} <nil> <nil> <nil> 0xc000434420}
        Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc0004343e8}
    controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0004343e8}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:157
    controller.go:266: aborting test due to missing call(s)
=== RUN   TestReconcileTags/tags_unchanged
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
    --- PASS: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- FAIL: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.310s
FAIL
cluster-api-provider-azure $
```

```bash
Running tool: /usr/local/bin/go test -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags

I0928 11:44:49.703539   31962 tags.go:81]  "msg"="Updating tags"
I0928 11:44:49.703538   31962 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 11:44:49.703539   31962 tags.go:81]  "msg"="Updating tags"
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc00012c088}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc00012c088}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc0002061b8}
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 1.
            Got: /sub/123/fake/scope
            Want: is equal to /sub/123/other/scope
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.GetAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/other/scope) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:85
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.AnnotationJSON(is equal to my-annotation-2) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:86
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0002061b8}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0002061f0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned thing:stuff]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:84
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.596s
FAIL
```

```bash
Running tool: /usr/local/bin/go test -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags

I0928 11:50:45.523833   34437 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 11:50:45.523834   34437 tags.go:81]  "msg"="Updating tags"
I0928 11:50:45.523833   34437 tags.go:81]  "msg"="Updating tags"
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc000122138}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc000122138}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc0004ac0a8}
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 1.
            Got: /sub/123/fake/scope
            Want: is equal to /sub/123/other/scope
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.GetAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/other/scope) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:85
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.AnnotationJSON(is equal to my-annotation-2) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:86
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0004ac0a8}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0004ac128}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned thing:stuff]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:84
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.607s
FAIL
```

```bash
Running tool: /usr/local/bin/go test -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags

I0928 12:01:18.965034   38738 tags.go:82]  "msg"="Updating tags"
I0928 12:01:18.965034   38738 tags.go:82]  "msg"="Updating tags"
I0928 12:01:18.965045   38738 tags.go:71]  "msg"="[Remove]"  "scope"="/sub/123/fake2/scope" "tags"={}
I0928 12:01:18.965332   38738 tags.go:99]  "msg"="successfully updated tags"
I0928 12:01:18.965341   38738 tags.go:72]  "msg"="Skipping tags reconcile for not managed resource"
I0928 12:01:18.965353   38738 tags.go:82]  "msg"="Updating tags"
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/error_updating_tags (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:91: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake4/scope {{<nil>} <nil> <nil> <nil> 0xc0005920e0}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:91 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:160 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc0005920e0}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc00019a088}
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake4/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc00019a088}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:160
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:91: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/other/scope {{<nil>} <nil> <nil> <nil> 0xc0001161a0}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:91 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc0001161a0}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc000116110}
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 1.
            Got: /sub/123/other/scope
            Want: is equal to /sub/123/fake/scope
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc000116110}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.605s
FAIL
```

```bash
Running tool: /usr/local/bin/go test -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags

I0928 12:02:01.567703   38861 tags.go:81]  "msg"="Updating tags"
I0928 12:02:01.567703   38861 tags.go:81]  "msg"="Updating tags"
I0928 12:02:01.567716   38861 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"  "scope"="/sub/123/fake2/scope" "tags"={}
--- FAIL: TestReconcileTags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc0001160a8}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because:
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75 doesn't match the argument at index 2.
            Got: {{<nil>} <nil> <nil> <nil> 0xc0001160a8}
            Want: is equal to {{<nil>} <nil> <nil> <nil> 0xc00069a0a0}
            expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87 doesn't match the argument at index 1.
            Got: /sub/123/fake/scope
            Want: is equal to /sub/123/other/scope
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.GetAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/other/scope) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:85
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.AnnotationJSON(is equal to my-annotation-2) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:86
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc00069a0a0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:75
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc00069a0d8}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:87
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned thing:stuff]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:84
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:95
        /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/controller.go:266: aborting test due to missing call(s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.530s
FAIL
```

```bash
cluster-api-provider-azure $ go test -v -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags_for_managed_resources
=== PAUSE TestReconcileTags/create_tags_for_managed_resources
=== RUN   TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== PAUSE TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags_for_managed_resources
=== CONT  TestReconcileTags/error_updating_tags
=== CONT  TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/do_not_create_tags_for_unmanaged_resources
I0928 12:33:28.033204   46299 tags.go:81]  "msg"="Updating tags"
I0928 12:33:28.033423   46299 tags.go:98]  "msg"="successfully updated tags"
I0928 12:33:28.033204   46299 tags.go:81]  "msg"="Updating tags"
I0928 12:33:28.033441   46299 tags.go:81]  "msg"="Updating tags"
I0928 12:33:28.033227   46299 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 12:33:28.033463   46299 tags.go:98]  "msg"="successfully updated tags"
--- PASS: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/create_tags_for_managed_resources (0.00s)
    --- PASS: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	(cached)
cluster-api-provider-azure $
```

---

```bash
cluster-api-provider-azure $ go test -v -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags_for_managed_resources
=== PAUSE TestReconcileTags/create_tags_for_managed_resources
=== RUN   TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== PAUSE TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== RUN   TestReconcileTags/delete_removed_tags
=== PAUSE TestReconcileTags/delete_removed_tags
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags_for_managed_resources
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/delete_removed_tags
=== CONT  TestReconcileTags/error_updating_tags
=== CONT  TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== CONT  TestReconcileTags/tags_unchanged
I0928 13:59:16.679474   68059 tags.go:81]  "msg"="Updating tags"
I0928 13:59:16.679474   68059 tags.go:81]  "msg"="Updating tags"
I0928 13:59:16.679474   68059 tags.go:81]  "msg"="Updating tags"
I0928 13:59:16.679476   68059 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
=== CONT  TestReconcileTags/delete_removed_tags
    tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc000708188}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because: there are no expected calls of the method "CreateOrUpdateAtScope" for that receiver
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/fake/scope, is equal to {Delete 0xc000708128}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:149
=== CONT  TestReconcileTags/create_tags_for_managed_resources
    tags.go:90: Unexpected call to *mock_tags.Mockclient.CreateOrUpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {{<nil>} <nil> <nil> <nil> 0xc000010090}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:90 because: there are no expected calls of the method "CreateOrUpdateAtScope" for that receiver
=== CONT  TestReconcileTags/delete_removed_tags
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:158
    controller.go:266: aborting test due to missing call(s)
=== CONT  TestReconcileTags/create_tags_for_managed_resources
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned thing:stuff]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:84
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:100
    controller.go:266: missing call(s) to *mock_tags.Mockclient.GetAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/other/scope) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:85
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.AnnotationJSON(is equal to my-annotation-2) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:90
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/fake/scope, is equal to {Merge 0xc0001100c0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:74
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/other/scope, is equal to {Merge 0xc000110108}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:91
    controller.go:266: aborting test due to missing call(s)
--- FAIL: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
    --- FAIL: TestReconcileTags/delete_removed_tags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.540s
FAIL
cluster-api-provider-azure $
```

---

```bash
cluster-api-provider-azure $ go test -v -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags_for_managed_resources
=== PAUSE TestReconcileTags/create_tags_for_managed_resources
=== RUN   TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== PAUSE TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== RUN   TestReconcileTags/delete_removed_tags
=== PAUSE TestReconcileTags/delete_removed_tags
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/error_updating_tags
=== CONT  TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== CONT  TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags_for_managed_resources
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/delete_removed_tags
I0928 14:04:24.403293   69905 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 14:04:24.403294   69905 tags.go:81]  "msg"="Updating tags"
I0928 14:04:24.403382   69905 tags.go:81]  "msg"="Updating tags"
I0928 14:04:24.403476   69905 tags.go:81]  "msg"="Updating tags"
=== CONT  TestReconcileTags/error_updating_tags
    tags.go:87: Unexpected call to *mock_tags.Mockclient.UpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope { 0xc00037a128}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:87 because: there are no expected calls of the method "UpdateAtScope" for that receiver
=== CONT  TestReconcileTags/delete_removed_tags
    tags.go:87: Unexpected call to *mock_tags.Mockclient.UpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope { 0xc00069a108}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:87 because:
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:149 doesn't match the argument at index 2.
        Got: { 0xc00069a108}
        Want: is equal to {Delete 0xc00037a0a0}
=== CONT  TestReconcileTags/create_tags_for_managed_resources
    tags.go:87: Unexpected call to *mock_tags.Mockclient.UpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope { 0xc000120080}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:87 because:
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:74 doesn't match the argument at index 2.
        Got: { 0xc000120080}
        Want: is equal to {Merge 0xc000192080}
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:91 doesn't match the argument at index 1.
        Got: /sub/123/fake/scope
        Want: is equal to /sub/123/other/scope
=== CONT  TestReconcileTags/delete_removed_tags
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {Delete 0xc00037a0a0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:149
=== CONT  TestReconcileTags/error_updating_tags
    controller.go:266: missing call(s) to *mock_tags.Mockclient.CreateOrUpdateAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/fake/scope, is equal to {{<nil>} <nil> <nil> <nil> 0xc0000100c0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:204
    controller.go:266: aborting test due to missing call(s)
=== CONT  TestReconcileTags/delete_removed_tags
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:158
    controller.go:266: aborting test due to missing call(s)
=== CONT  TestReconcileTags/create_tags_for_managed_resources
    controller.go:266: missing call(s) to *mock_tags.Mockclient.GetAtScope(expected a context.Context, but got <nil>, is equal to /sub/123/other/scope) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:85
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.AnnotationJSON(is equal to my-annotation-2) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:90
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {Merge 0xc000192080}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:74
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/other/scope, is equal to {Merge 0xc0001920c0}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:91
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned thing:stuff]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:84
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation-2, is equal to map[sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned tag1:value1]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:100
    controller.go:266: aborting test due to missing call(s)
--- FAIL: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
    --- FAIL: TestReconcileTags/error_updating_tags (0.00s)
    --- FAIL: TestReconcileTags/delete_removed_tags (0.00s)
    --- FAIL: TestReconcileTags/create_tags_for_managed_resources (0.00s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.530s
FAIL
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ go test -v -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags_for_managed_resources
=== PAUSE TestReconcileTags/create_tags_for_managed_resources
=== RUN   TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== PAUSE TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== RUN   TestReconcileTags/delete_removed_tags
=== PAUSE TestReconcileTags/delete_removed_tags
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags_for_managed_resources
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/delete_removed_tags
=== CONT  TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== CONT  TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/error_updating_tags
I0928 14:09:47.409788   70815 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 14:09:47.409789   70815 tags.go:81]  "msg"="Updating tags"
I0928 14:09:47.409799   70815 tags.go:81]  "msg"="Updating tags"
I0928 14:09:47.409919   70815 tags.go:81]  "msg"="Updating tags"
I0928 14:09:47.410080   70815 tags.go:95]  "msg"="successfully updated tags"
=== CONT  TestReconcileTags/delete_removed_tags
    tags.go:87: Unexpected call to *mock_tags.Mockclient.UpdateAtScope([context.TODO.WithValue(type tele.CorrIDKey, val <not Stringer>).WithValue(type trace.traceContextKeyType, val <not Stringer>) /sub/123/fake/scope {Merge 0xc00030a0d8}]) at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags.go:87 because:
        expected call at /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:149 doesn't match the argument at index 2.
        Got: {Merge 0xc00030a0d8}
        Want: is equal to {Delete 0xc0001140b8}
I0928 14:09:47.410118   70815 tags.go:81]  "msg"="Updating tags"
I0928 14:09:47.410138   70815 tags.go:95]  "msg"="successfully updated tags"
    controller.go:266: missing call(s) to *mock_tags.Mockclient.UpdateAtScope(expected a context.Context, but got *context.valueCtx, is equal to /sub/123/fake/scope, is equal to {Delete 0xc0001140b8}) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:149
    controller.go:266: missing call(s) to *mock_tags.MockTagScope.UpdateAnnotationJSON(is equal to my-annotation, is equal to map[foo:bar sigs.k8s.io_cluster-api-provider-azure_cluster_test-cluster:owned]) /Users/karuppiahn/projects/github.com/kubernetes-sigs/cluster-api-provider-azure/azure/services/tags/tags_test.go:158
    controller.go:266: aborting test due to missing call(s)
--- FAIL: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
    --- PASS: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/create_tags_for_managed_resources (0.00s)
    --- FAIL: TestReconcileTags/delete_removed_tags (0.00s)
FAIL
FAIL	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.689s
FAIL
cluster-api-provider-azure $
```

```bash
cluster-api-provider-azure $ go test -v -timeout 30s -run ^TestReconcileTags$ sigs.k8s.io/cluster-api-provider-azure/azure/services/tags
=== RUN   TestReconcileTags
=== RUN   TestReconcileTags/create_tags_for_managed_resources
=== PAUSE TestReconcileTags/create_tags_for_managed_resources
=== RUN   TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== PAUSE TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== RUN   TestReconcileTags/delete_removed_tags
=== PAUSE TestReconcileTags/delete_removed_tags
=== RUN   TestReconcileTags/error_getting_existing_tags
=== PAUSE TestReconcileTags/error_getting_existing_tags
=== RUN   TestReconcileTags/error_updating_tags
=== PAUSE TestReconcileTags/error_updating_tags
=== RUN   TestReconcileTags/tags_unchanged
=== PAUSE TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/create_tags_for_managed_resources
=== CONT  TestReconcileTags/error_getting_existing_tags
=== CONT  TestReconcileTags/delete_removed_tags
=== CONT  TestReconcileTags/do_not_create_tags_for_unmanaged_resources
=== CONT  TestReconcileTags/tags_unchanged
=== CONT  TestReconcileTags/error_updating_tags
I0928 14:13:13.474938   71600 tags.go:81]  "msg"="Updating tags"
I0928 14:13:13.475231   71600 tags.go:108]  "msg"="successfully updated tags"
I0928 14:13:13.474942   71600 tags.go:71]  "msg"="Skipping tags reconcile for not managed resource"
I0928 14:13:13.474948   71600 tags.go:81]  "msg"="Updating tags"
I0928 14:13:13.475043   71600 tags.go:81]  "msg"="Updating tags"
I0928 14:13:13.475297   71600 tags.go:108]  "msg"="successfully updated tags"
I0928 14:13:13.475320   71600 tags.go:81]  "msg"="Updating tags"
I0928 14:13:13.475340   71600 tags.go:108]  "msg"="successfully updated tags"
--- PASS: TestReconcileTags (0.00s)
    --- PASS: TestReconcileTags/error_getting_existing_tags (0.00s)
    --- PASS: TestReconcileTags/tags_unchanged (0.00s)
    --- PASS: TestReconcileTags/delete_removed_tags (0.00s)
    --- PASS: TestReconcileTags/do_not_create_tags_for_unmanaged_resources (0.00s)
    --- PASS: TestReconcileTags/error_updating_tags (0.00s)
    --- PASS: TestReconcileTags/create_tags_for_managed_resources (0.00s)
PASS
ok  	sigs.k8s.io/cluster-api-provider-azure/azure/services/tags	0.479s
cluster-api-provider-azure $
```

---

I have some questions and thoughts -

Questions -

- Do we want to handle both Azure Cluster and Azure Managed Control Plane Resource Groups in this PR? I made the changes for both, but if we want to separate it out, I could do that too
- Should we write some tests for the Azure Cluster and Azure Managed Control Plane reconciler? Currently I noticed there are no tests. There's not much processing being done as part of this PR with regards to the reconciler and the Cluster scope and Managed Control Plane Scope, it's more of passing around data. Only in `AnnotationJSON` and `UpdateAnnotationJSON` - there's some JSON serialization and JSON parsing code. I haven't added any tests at these levels, as it was mostly just data passing and less processing but let me know what you folks think
- Should we name `created` in tags service to something like `createdOrUpdated`? Currently it's clear only in one place, where it says

```go
// Tracking for created/updated
created := map[string]string{}
```

everywhere else we use `created` though it includes `updated` tags too, where tag value is updated. Or we could just rename it as `updated` which can encompass a newly created tag too

- Currently as part of this PR's implementation, we do GET resource tags request to check if the resources are managed based on the owned tag value. In the case of managed resource, here we assume that the owned tag still remains while we do diff processing and then call APIs for updates based on diffs. I think this is a somewhat fair assumption. But yeah it's totally possible for an external entity to remove the owned tag value just after our GET request and just before our update API call. What do you folks think about this scenario?

Thoughts -

- Currently we do a diff using tag spec tags (desired tags) vs last applied tags which is present in the annotation. And then we do appropriate patch API calls (merge / delete) for the diff. There's one downside to this approach, it's possible that an external entity changed the CAPZ managed tags of the resource, and we would miss out to take care of that while reconciling. For example, with the current implementation in this PR -

Initial Azure Resource Tags: `{ c: c1, d: d1 }`
Tag Spec: `{ a: a1, b: b1 }`
Last Applied Tags from K8s Annotation: `{ a: a1, b: b1 }`
No diff, no calls to Azure API to make changes
Final Azure Resource Tags: `{ c: c1, d: d1 }`

In the above case, ideally, Azure Resource Tags should have been patched (merged) with `{ a: a1, b: b1 }` to finally get `{ a: a1, b: b1, c: c1, d: d1 }`. Why? As it looks like someone meddled with the tags that are managed by CAPZ and CAPZ has to reconcile it. Another example is below

Initial Azure Resource Tags: `{ c: c1, d: d1 }`
Tag Spec: `{ a: a1, b: b1 }`
Last Applied Tags from K8s Annotation: `{ a: a1 }`
There is diff, one patch (merge) call with `{ b: b1 }` to Azure API to make changes
Final Azure Resource Tags: `{ b: b1, c: c1, d: d1 }`

In the above case, ideally, Azure Resource Tags should have been patched (merged) with `{ a: a1, b: b1 }` to finally get `{ a: a1, b: b1, c: c1, d: d1 }`.

I didn't write test cases for such scenarios though, though I could have. I wanted to discuss it first without code / test code. Let me know if you want to look at test cases for the above examples in case the examples are not very clear or just to help with discussions, I could write the test cases

I think the diff should be done something like this -

For finding deletions, we can look at last applied tags from annotation and then compare it with the desired tag spec

For finding updated / created, we can look at current Azure resource tags from Azure API and then compare it with the desired tag spec

How does that sound?

- `tagsChanged` function returns `map[string]string` for created-or-update and deleted, which we later have to convert to `map[string]*string` for doing the update-at-scope API call for both created-or-updated and deleted. I was wondering if that's okay or if we should we just return `map[string]*string` from `tagsChanged`. Though it's sole responsibility is to help with finding with the tags changed, it could also help more by providing data of appropriate data type for it's only caller which is the tags service

Let me know what you folks think about the code, tests and the above questions and thoughts! Thanks!

---

Thanks to you too @CecileRobertMichon for helping review this PR promptly with lot of help through comments here and in the issue

> Perhaps let's add the tag svc to https://github.com/kubernetes-sigs/cluster-api-provider-azure/blob/341acbedc9074e179802bcf30c083768cba839e6/controllers/azurecluster_reconciler_test.go.

I was going to do that. The Azure cluster reconciler tests passed regardless (with no nil pointer exceptions) and when I checked it out, I noticed we don't have tests for the `Reconcile` method and we only have tests for Azure cluster `Delete` method

> we shouldn't allow for external actors to also manage them

Ah okay. Based on the discussion in the issue #1696 , I was under the impression that CAPZ has it's own set of tags that it can manage and shouldn't be interfering (by overwriting) with the tags that are added and managed by users / other systems for other purposes, for example to help with billing? This is based on the comments from @devigned - https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issuecomment-925060775 , https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issuecomment-925078929 , https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issuecomment-925130687 .

> Otherwise, we introduce an ambiguous source of truth and it becomes difficult to reconcile changes when they happen in both as you pointed out.

True, the thing is I have noticed this kind of feature/behavior with Kubernetes too where changes can happen outside the managed fields. I remember reading `kubectl apply` helps manage resources using YAML but also retains some external modifications by users which are not part of the YAML. I think [this doc](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#kubectl-apply) talks a bit about it, I think the term popularly used is the "three way diff" or "three way merge". So if we think about a similar narrative here - it's more like there are CAPZ managed tags, and then there could be tags managed and owned by other systems or users which they can modify. We track what we manage using the last-applied-tags annotation in the case of tags service, similar to Kubernetes last-applied annotation

> That being said, GETs are cheap and I think it's totally fair to do a GET on each loop to determine if anything has changed. If we're already doing the GET for create/update, we can use the same data for deleted tags too and the annotation becomes sort of useless.

Makes sense. If we are not looking to let other external systems / users manage their own separate set of tags which are different from CAPZ managed tags, then yeah, it's not needed to use the annotation and we can just use GET for current resource tags and compare it with the desired resource tags in the tag spec. Currently the implementation in `main` branch the annotation is already being used, and I believe it is exactly to support other external entities to manage their own separate tags. It does GET to get all resource tags - CAPZ managed and probably other tags managed by other external entities, and then does a diff between last-applied annotation tags and desired resource tags in the tag spec to get the diff only for tags managed by CAPZ. The only tricky thing is, with the implementation in `main` we might overwrite the data of other systems as mentioned in [this comment](https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issuecomment-925060775) and it also has the downsides of the implementation in this PR, which is, it's possible that the annotation and desired don't have diff but the desired tags are not in current resource, maybe because some external entity removed it

> For the issue of the race condition where someone updates the tag after we do the GET and before the PUT, does the tag CreateOrUpdateAtScope API have etags supported? if so, we can use those to make changes only if the etag hasn't changed. If not, I think it's not a huge problem to assume the owned tag doesn't get deleted in between.

What do you mean by `someone`? You mentioned we expect only CAPZ to manage the tags and no external entities, so is it another instance of CAPZ? and `CreateOrUpdateAtScope` API does not support etags from what I see in the API docs [here](https://docs.microsoft.com/en-us/rest/api/resources/tags/create-or-update-at-scope)

Also, in this PR, I have replaced the `CreateOrUpdateAtScope` with two [`UpdateAtScope`](https://docs.microsoft.com/en-us/rest/api/resources/tags/update-at-scope) API calls - one for create or update using `Merge` [patch operation](https://docs.microsoft.com/en-us/rest/api/resources/tags/update-at-scope#tagspatchoperation) and another for delete using `Delete` [patch operation](https://docs.microsoft.com/en-us/rest/api/resources/tags/update-at-scope#tagspatchoperation). This is based on the [comment here](https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issuecomment-925013265) from @devigned . This will help prevent us from race conditions [mentoned here](https://github.com/kubernetes-sigs/cluster-api-provider-azure/issues/1696#issuecomment-925078929) I think - where we overwrite data of external systems by mistake. But I'm not sure if you were talking about external entities

So the big question is - when we say a resource is managed by CAPZ (using the `owned` tag value), should **all** the tags on the resource be managed by CAPZ? Or is it okay for some tags to be added and managed and owned by external entities? Assuming these tags by external entities are totally different (different tag keys) from what CAPZ manages, because if there's conflict / clash there, then CAPZ and external entities are going to have a hard time updating the tags unnecessarily

---

TODO
If #1740 gets merged, might have to do rebase as it has some major changes.
