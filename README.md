# BillingApp
TypeScript Azure function oriented to process Billings.

# Description
The **BillingApp** application is an app function that, through the Azure function **PersistInvoiceMetadata**, allows invoices to be processed into the CosmosDB database.

To consume the **/PersistInvoiceMetadata** function locally, you must first execute the function through the **func start** command.

`Azure Functions Core Tools`\
`Core Tools Version:       4.0.5390 Commit hash: N/A  (64-bit)`\
`Function Runtime Version: 4.25.3.21264`

`Worker process started and initialized.`

`Functions:`

`        PersistInvoiceMetadata: [POST] http://localhost:7071/api/PersistInvoiceMetadata`

`For detailed output, run func with --verbose flag.`

Then, make the request through a JSON body like the one shown below:

`{`\
`	"id":"20240101",`\
`	"serviceType":"OTHER",`\
`	"payDate":"20240130", `\
`	"payedTotal":"45000", `\
`	"amount":"45000",`\
`	"taxAmount":"0",`\
`	"paymentMethod": "TRANSF"`\
`}`
