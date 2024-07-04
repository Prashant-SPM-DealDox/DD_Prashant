import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { commonService } from "../../utils/common";
import { baseUrl, secretKey } from "../../config";

const SalesForceLoginUser = () => {
    const { encryptedToken, encryptedOpportunityId } = useParams();

    useEffect(() => {
        if (encryptedToken && encryptedOpportunityId) {
            const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(CryptoJS.enc.Utf8);
            const decryptedOpportunityId = CryptoJS.AES.decrypt(encryptedOpportunityId, secretKey).toString(CryptoJS.enc.Utf8);
            if (decryptedToken) {
                localStorage.setItem('user', { token: decryptedToken })
            }
            if (decryptedOpportunityId) {
                const getOpportunityData = async () => {
                    setIsLoading(true);
                    try {
                        const response = await commonService(
                            "/api/opportunity/getOpp",
                            "POST",
                            { opp_id: decryptedOpportunityId }
                        );
                        if (response.status === 200) {
                            const oppData = response.data.data;
                            const acc_opp_id = {
                                acc_key: oppData.account_Id || '',
                                acc_name: oppData.accounts || '',
                                opp_id: oppData._id || '',
                                oppName: oppData.opportunity_name || '',
                            };

                            navigate(`/quotecreation`, { state: { acc_opp_id } });
                        } else {
                            // console.log("no Data Founfs");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };

                getOpportunityData();
            }
        }
    }, [encryptedToken, encryptedOpportunityId]);
    return (
        <></>
    );
}

export default SalesForceLoginUser;