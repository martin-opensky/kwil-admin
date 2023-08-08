## Kwil Admin UI

The Kwil Admin UI is built using Next.JS and communicates with the local Kwil Provider deployed within the Docker network. It is a tool to be used by the Kwil DB Administrator only, which means that the account creating all databases remains fixed to the one set in the environment file. For a full demo please see the submission video, however, some screenshots are included below.

The Kwil Provider alias _(Provider 1)_, URL and address are loaded from the information set in the ENV file. Then all databases are loaded.

<div style="display: flex; justify-content: center;">
<img src="https://lets.embrace.community/arweave-hack/kwil-provider.png" style="height: 400px;" />
</div>

When a DB is selected then all the tables and actions are loaded onto the UI. The Admin user, can navigate between all the tables in the schema.

<div style="display: flex; justify-content: center;">
<img src="https://lets.embrace.community/arweave-hack/kwil-admin.png" style="height: 350px;" />
</div>

All actions are listed on the right side of the UI, and once clicked an action modal will display allowing the input variables to be entered.

<div style="display: flex; justify-content: space-between;">
<img src="https://lets.embrace.community/arweave-hack/kwil-action-list.png" style="height: 200px;" />
</div>
<div style="display: flex; justify-content: space-between;">
<img src="https://lets.embrace.community/arweave-hack/kwil-action.png" style="height: 300px;" />
</div>
