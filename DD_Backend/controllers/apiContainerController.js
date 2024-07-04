const axios = require('axios');

const mongo = require("../adaptor/mongodb.js");

const reqHeadersDB = (req) => {
    return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};

const base_url = 'https://web-api.dealdox.io/';   // http://localhost:4001

const getAccountContainer = async (req, res) => {
    const admin_id = req.user._id;
    let { account_body } = req.body;
    try {
        const existingAccount = await mongo.GetDocument(
            "accounts",
            {
                admin_id: admin_id,
                external_references_id1: account_body?.accountData?.external_references_id1
            },
            {},
            {},
            reqHeadersDB(req)
        );
        if (existingAccount) {
            apiUpdateContainerController(req, res);
        } else {
            apiContainerController(req, res);
        }
    } catch (error) {
        res.status(401).json({ error: "Failed" });
    }
}

const apiContainerController = async (req, res) => {
    const admin_id = req.user._id;
    let { account_body, opportunity_body } = req.body;
    let url_account = `${base_url}/api/accounts/add`;
    let url_opportunity = `${base_url}/api/opportunity/add`;
    try {
        const accountResponse = await axios.post(url_account, account_body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${req.headers.authorization}`
            }
        });
        let opportunityResponse;
        if (accountResponse && accountResponse?.data) {
            const account_id = accountResponse?.data?.data?.accounts_data?._id;
            const account_name = accountResponse?.data?.data?.accounts_data?.accounts;
            opportunity_body.newOpportunityData.account_Id = account_id;
            opportunity_body.newOpportunityData.accounts = account_name;

            const opportunity_found = await mongo.GetDocument("opportunity", {
                admin_id: admin_id,
                external_references_id1: opportunity_body?.opportunityData?.external_references_id1
            }, {}, {}, reqHeadersDB(req));

            if (!opportunity_found) {
                opportunityResponse = {
                    data: {
                        Error: "Error",
                        message: "External Id not unique for opportunity",
                    }
                };
            } else {
                opportunityResponse = await axios.post(url_opportunity, opportunity_body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${req.headers.authorization}`
                    }
                });
            }
        }

        const combinedResponse = {
            accountResponse: accountResponse?.data,
            opportunityResponse: opportunityResponse?.data
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
}

const apiUpdateContainerController = async (req, res) => {
    let { account_body, opportunity_body } = req.body;
    let acc_external_references_id1 = account_body?.accountData?.external_references_id1;
    let opp_external_references_id1 = opportunity_body?.opportunityData?.external_references_id1;
    let url_account = `${base_url}/api/accounts/update/${acc_external_references_id1}`;
    let url_opportunity_update = `${base_url}/api/opportunity/update/${opp_external_references_id1}`;
    let url_opportunity_add = `${base_url}/api/opportunity/add`;

    try {
        let accountResponse;
        if (acc_external_references_id1) {
            accountResponse = await axios.put(url_account, account_body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${req.headers.authorization}`
                }
            });
        }
        let opportunityResponse;

        const opportunity_found = await mongo.GetDocument("opportunity", {
            admin_id: admin_id,
            external_references_id1: opportunity_body?.opportunityData?.external_references_id1
        }, {}, {}, reqHeadersDB(req));


        if (!opportunity_found) {
            opportunityResponse = await axios.post(url_opportunity_add, opportunity_body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${req.headers.authorization}`
                }
            });
        } else {
            // if(opp_external_references_id1 && accountResponse && (accountResponse.status === 200 || accountResponse.status === 202)) 
            opportunityResponse = await axios.put(url_opportunity_update, opportunity_body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${req.headers.authorization}`
                }
            });
        }

        const combinedResponse = {
            accountResponse: accountResponse?.data,
            opportunityResponse: opportunityResponse?.data,
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        res.status(500).json({ error: `Internal Server Error - ${error}` });
    }
}

module.exports = {
    getAccountContainer
}