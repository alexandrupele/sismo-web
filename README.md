# sismo-web Bridge

This web app acts as a bridge between the Vault App and the React Native mobile apps.

The main actors are **[Mobile - the RN app]**, **[Vault - the Vault app]**, **[Bridge - this app]**.

The flow of events looks like this: 

1. **[Mobile]** opens **[Bridge]** in an external web browser.


2. **[Bridge]** redirects to **[Vault]** asking for the required attestations.


3. Once the user gets the attestations and creates the ZK Proof, **[Vault]** redirects back to **[Bridge]** with the *sismoConnectResponseCompressed* query parameter.


4. **[Bridge]** decompresses the response and resumes **[Mobile]** with a deep link containing the response data.

### Full explanation


Why is this **[Bridge]** middle layer needed? It is mainly because of a couple limitations that **[Vault]** and *sismo-connect-client* have in regards to native mobile clients.

The *sismo-connect-client* package does not fully support React Native yet. This is because it internally uses *window.location.href* to redirect the user to **[Vault]**. The *window.location* object is only available in a browser and will cause errors when used on **[Mobile]**. The best solution to avoid this is to open **[Vault]** in an external browser instead. But, when opened directly in a browser, the **[Vault]** will show a *'no referrer found'* error. It does this because it needs to know where the user came from in order to callback with the response. Since the user came from a **[Mobile]** instead of a generic web app, **[Vault]** doesn't know yet how to redirect there. This is where **[Bridge]** comes in, knowing how to redirect to a deep link instead of the *'referrer'* currently used by **[Vault]**.
