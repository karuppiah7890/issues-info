https://github.com/liquibase/liquibase/issues/1345

I'm thinking of looking for the text `Connected to` in the codebase - finding
all the occurences of it

Okay. I did it. There's only one Java file that has the text

I'm working with this commit - `99e76caad1c5c0060a030e48853f163c47a4f383`

/Users/karuppiahn/oss/github.com/liquibase/liquibase/liquibase-core/src/main/java/liquibase/database/AbstractJdbcDatabase.java#157

```java
        Scope.getCurrentScope().getLog(getClass()).fine("Connected to " + conn.getConnectionUserName() + "@" + conn.getURL());
```

According to the issue, we need to print the connection string even when the
connection fails. Hmm. I need to check where that exception would occur. Maybe
find the tests for it and use it to check if the logs are right once I fix it.
Not sure if the tests test the log messages too, that would be a lot of testing
I guess but it would be great in the sense that I would be able to write a test
for it, a failing test and then pass it by fixing it

I can see some code based on the guess `connect(` would be a method call. 

I can also see the issue having links to the line I already mentioned

https://github.com/liquibase/liquibase/blob/90cd7532ababa6db46f4f344050890b465609932/liquibase-core/src/main/java/liquibase/database/AbstractJdbcDatabase.java#L157

Some more links in the issue

https://github.com/keycloak/keycloak/blob/df94cefbc1016e4d6d37c77e4b29cb49c0bdffb7/model/jpa/src/main/java/org/keycloak/connections/jpa/updater/liquibase/conn/DefaultLiquibaseConnectionProvider.java#L92

https://issues.redhat.com/browse/KEYCLOAK-15245

Hmm. Looks like I need to run the docker compose file provided by the OP to see
other logs. Or I could read keycloak code to see what invoked the connection
string to show up when connected successfully! :)

```bash
$ mkdir keycloak
$ cd keycloak
$ git clone git@github.com:keycloak/keycloak.git
$ cd keycloak
```

The repo is still getting ready in my IDE. Lot of dependencies and all.

I'm also setting up the docker compose file. There was an error in the keycloak
image name - `quay.io/repository/keycloak/keycloak`. The correct one is
`quay.io/keycloak/keycloak` as I saw here - https://quay.io/repository/keycloak/keycloak

I'm able to see the logs mentioned in the issue

Finally the IDE has got all the dependencies. I think I just ate up all the disk
space 😅 Hmm

So, I found out from the logs that 

```log
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-model-jpa@11.0.1//org.keycloak.connections.jpa.DefaultJpaConnectionProviderFactory.getConnection(DefaultJpaConnectionProviderFactory.java:371)
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-model-jpa@11.0.1//org.keycloak.connections.jpa.updater.liquibase.lock.LiquibaseDBLockProvider.lazyInit(LiquibaseDBLockProvider.java:65)
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-model-jpa@11.0.1//org.keycloak.connections.jpa.updater.liquibase.lock.LiquibaseDBLockProvider.lambda$waitForLock$2(LiquibaseDBLockProvider.java:96)
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-server-spi-private@11.0.1//org.keycloak.models.utils.KeycloakModelUtils.suspendJtaTransaction(KeycloakModelUtils.java:682)
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-model-jpa@11.0.1//org.keycloak.connections.jpa.updater.liquibase.lock.LiquibaseDBLockProvider.waitForLock(LiquibaseDBLockProvider.java:94)
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-services@11.0.1//org.keycloak.services.resources.KeycloakApplication$1.run(KeycloakApplication.java:135)
```

`LiquibaseDBLockProvider` showed up a lot of times.

Some errors / exceptions are

```log
[36mkeycloak_1       |[0m [0m[33m18:29:19,677 WARN  [org.jboss.jca.core.connectionmanager.pool.strategy.OnePool] (ServerService Thread Pool -- 66) IJ000604: Throwable while attempting to get a new connection: null: javax.resource.ResourceException: IJ031084: Unable to create connection
```

```log
[36mkeycloak_1       |[0m Caused by: org.postgresql.util.PSQLException: FATAL: database "keycloak" does not exist
```

``log
[36mkeycloak_1       |[0m [0m[31m18:29:19,688 FATAL [org.keycloak.services] (ServerService Thread Pool -- 66) Error during startup: java.lang.RuntimeException: Failed to connect to database
```

```log
[36mkeycloak_1       |[0m Caused by: java.sql.SQLException: javax.resource.ResourceException: IJ000453: Unable to get managed connection for java:jboss/datasources/KeycloakDS
```

```log
[36mkeycloak_1       |[0m Caused by: javax.resource.ResourceException: IJ000453: Unable to get managed connection for java:jboss/datasources/KeycloakDS
```

```log
[36mkeycloak_1       |[0m Caused by: javax.resource.ResourceException: IJ031084: Unable to create connection
```

```log
[36mkeycloak_1       |[0m Caused by: org.postgresql.util.PSQLException: FATAL: database "keycloak" does not exist
```

```log
[36mkeycloak_1       |[0m [0m[31m18:29:20,324 ERROR [org.jboss.as.controller.management-operation] (Controller Boot Thread) WFLYCTL0013: Operation ("add") failed - address: ([("subsystem" => "microprofile-metrics-smallrye")]): java.lang.NullPointerException
```

I also used the good log from the issue -

```log
keycloak_1 07:14:31,337 TRACE [org.keycloak.connections.jpa.updater.liquibase.conn.DefaultLiquibaseConnectionProvider] (ServerService Thread Pool – 67) Connected to admin@jdbc:postgresql://postgres:5432/public?schema=keycloak
```

I tried to see where it came from

If you notice, the line says `TRACE`. 

There are some `trace()` log calls in the java file
/Users/karuppiahn/oss/github.com/keycloak/keycloak/model/jpa/src/main/java/org/keycloak/connections/jpa/updater/liquibase/conn/DefaultLiquibaseConnectionProvider.java

I'm using the commit `6d45d715d3abfae8e192c2355739de78cb24b9ce` in keycloak repo

org/keycloak/connections/jpa/updater/liquibase/conn/DefaultLiquibaseConnectionProvider.java:221
org/keycloak/connections/jpa/updater/liquibase/conn/DefaultLiquibaseConnectionProvider.java:238

I think the thing to note is, the error occurs here
https://github.com/keycloak/keycloak/blob/47d6d65bbb18a5f23a5b67c2282e2090fab9e4a3/model/jpa/src/main/java/org/keycloak/connections/jpa/DefaultJpaConnectionProviderFactory.java#L371

exception being here
https://github.com/keycloak/keycloak/blob/47d6d65bbb18a5f23a5b67c2282e2090fab9e4a3/model/jpa/src/main/java/org/keycloak/connections/jpa/DefaultJpaConnectionProviderFactory.java#L377

which is because of the call here

https://github.com/keycloak/keycloak/blob/bd5dec18303b7a8ce7d7d5669a386e18bb56c87f/model/jpa/src/main/java/org/keycloak/connections/jpa/updater/liquibase/lock/LiquibaseDBLockProvider.java#L65

according to the logs

```log
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-model-jpa@11.0.1//org.keycloak.connections.jpa.DefaultJpaConnectionProviderFactory.getConnection(DefaultJpaConnectionProviderFactory.java:371)
[36mkeycloak_1       |[0m 	at org.keycloak.keycloak-model-jpa@11.0.1//org.keycloak.connections.jpa.updater.liquibase.lock.LiquibaseDBLockProvider.lazyInit(LiquibaseDBLockProvider.java:65)
```

But the liquibase call happens here only

https://github.com/keycloak/keycloak/blob/bd5dec18303b7a8ce7d7d5669a386e18bb56c87f/model/jpa/src/main/java/org/keycloak/connections/jpa/updater/liquibase/lock/LiquibaseDBLockProvider.java#L69

I think only keycloak code can display the connection string. This is because -
when it's all successful, then it goes to liquibase, where liquibase logs the
connection string, but when it fails, it fails well before it enters the
boundary of liquibase to log it out

The success path for liquibase looks like this I think

It starts here

https://github.com/keycloak/keycloak/blob/bd5dec18303b7a8ce7d7d5669a386e18bb56c87f/model/jpa/src/main/java/org/keycloak/connections/jpa/updater/liquibase/lock/LiquibaseDBLockProvider.java#L69

Goes here

https://github.com/keycloak/keycloak/blob/af5df1e535fb854b1e8070b9ffdd76ebee0986f8/model/jpa/src/main/java/org/keycloak/connections/jpa/updater/liquibase/conn/DefaultLiquibaseConnectionProvider.java#L136

And then here given it's a known database - postgres database

https://github.com/liquibase/liquibase/blob/liquibase-parent-3.5.5/liquibase-core/src/main/java/liquibase/database/DatabaseFactory.java#L131

And then here

https://github.com/liquibase/liquibase/blob/liquibase-parent-3.5.5/liquibase-core/src/main/java/liquibase/database/core/PostgresDatabase.java#L116

And then here

https://github.com/liquibase/liquibase/blob/liquibase-parent-3.5.5/liquibase-core/src/main/java/liquibase/database/AbstractJdbcDatabase.java#L137

That's the `Connected to ...` statement. Hmm

Looks like keycloak has to do this handling! 

I have put a comment on liquibase Github issue and on keycloak JIRA too

https://github.com/liquibase/liquibase/issues/1345#issuecomment-683102146

https://issues.redhat.com/browse/KEYCLOAK-15245?focusedCommentId=14415293&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-14415293

