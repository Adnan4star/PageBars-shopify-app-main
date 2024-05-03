import {
    Card,
    Page,
    Button,
    Text,
    BlockStack,
    Icon, InlineStack, Divider
} from "@shopify/polaris";
// import { useTranslation, Trans } from "react-i18next";
import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FormsMajor, ViewMajor, EmailMajor, ChatMajor, AutomationFilledMajor, CustomersMajor, SettingsMinor } from '@shopify/polaris-icons';

import useApi from '../components/customhooks/useApi';
import { useAppBridge } from "@shopify/app-bridge-react";
import { AppContext } from "../components/providers";
import { Loading } from '@shopify/app-bridge-react';
import { SkeltonPaymentPage } from "../components/SkeltonPage";
export default function BillingPlan() {

    const navigate = useNavigate();
    const { shop, url } = useContext(AppContext);
    console.log("from information ", shop);
    const appBridge = useAppBridge()
    const { callApi, loading, error } = useApi(appBridge, url);
    const [currentPlan, setCurrentPlan] = useState();
    const handlePlanSubscription = async (id) => {
        const response = await callApi(`subscripe-plan?shop=${shop}&plan_id=${id}`, 'POST');;
        if (response.return_url) {
            window.open(response.return_url, '_blank');
        }
    }

    const CurrentPlan = async () => {
        const response = await callApi(`current-plan`, 'GET');
        setCurrentPlan(response);
    }

    useEffect(() => {
        CurrentPlan();
    }, [])
    const billingData = [
        {
            id: 1,
            name: "Free",
            price: 0,
            pageBars: 1,
            contacts: 1000,
            impressions: "Unlimited",
            emailCompaigns: "Unlimited",
            automationsFlows: "Unlimited",
        },
        {
            id: 2,
            name: "Lite",
            price: 5,
            pageBars: 5,
            contacts: "10,000",
            impressions: "Unlimited",
            emailCompaigns: "Unlimited",
            automationsFlows: "Unlimited",
        },
        {
            id: 3,
            name: "Plus",
            price: 9,
            pageBars: 10,
            contacts: "50,000",
            impressions: "Unlimited",
            emailCompaigns: "Unlimited",
            automationsFlows: "Unlimited",
        },
        {
            id: 4,
            name: "Pro",
            price: 19,
            pageBars: 20,
            contacts: "100,000",
            impressions: "Unlimited",
            emailCompaigns: "Unlimited",
            automationsFlows: "Unlimited",
        },
        {
            id: 5,
            name: "Max",
            price: 29,
            pageBars: 30,
            contacts: "200,000",
            impressions: "Unlimited",
            emailCompaigns: "Unlimited",
            automationsFlows: "Unlimited",
        },
        {
            id: 6,
            name: "Enterprise",
            price: 99,
            pageBars: "Unlimited",
            contacts: "Unlimited",
            impressions: "Unlimited",
            emailCompaigns: "Unlimited",
            automationsFlows: "Unlimited",
        }
    ]

    return (
        <>
            {
                loading ? (
                    <>
                        <div className="container max-w-[1350px] w-full mx-auto">
                            <Loading />
                            <SkeltonPaymentPage />
                        </div>
                    </>
                ) : (
                    <div className="container max-w-[1350px] w-full mx-auto">
                        <Page title="Billing Plans">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                                {billingData?.map((data, index) => (
                                    <div key={index} className="">
                                        {/* <Card sectioned title={data?.name} padding={0} > */}
                                        <div className="rounded-[16px] bg-white h-full grid  border-gray-200 border-1" style={{ boxShadow: '0 0px 1.5px gray' }}>
                                            <div className={index === 2 ? "border-2 z-50 relative border-gray-700 rounded-[16px]" : "rounded-[16px]"}>
                                                {
                                                    index == 2 && (
                                                        // <div className="absolute left-1/2 -top-2 z-[9999999] h-5 w-24   -translate-x-1/2 rounded-xl bg-stone-950">
                                                        //     <div className="absolute left-[40%]  h-1 w-7  -translate-x-1/2 rounded-full text-white"> popular</div>
                                                        // </div>
                                                        <div className="rounded-lg absolute bg-stone-950  flex justify-center items-center left-1/2  -translate-x-1/2 z-50 -top-2 h-5 w-24 text-white">
                                                            Popular
                                                        </div>
                                                    )
                                                }

                                                <div className="my-10 mx-5 z-0">
                                                    <BlockStack gap="600" align='center' inlineAlign='center'>
                                                        <Text variant="heading2xl" as="h2" fontWeight="semibold">
                                                            {data?.name}
                                                        </Text>
                                                        <InlineStack gap="200" blockAlign='center'>
                                                            <Text variant="heading3xl" as="h2" fontWeight="bold">
                                                                ${data?.price}
                                                            </Text>
                                                            <Text as="p" variant="bodyMd">
                                                                / month
                                                            </Text>
                                                        </InlineStack>
                                                        <Button size="large" fullWidth variant="primary"
                                                            disabled={((index + 1) == currentPlan?.plan?.id)}
                                                            onClick={() => handlePlanSubscription(data?.id)}>{(index + 1) == (currentPlan?.plan?.id) ? "Your Current Plan" : "Upgrade Plan"}</Button>
                                                        <Divider />
                                                    </BlockStack>
                                                    <BlockStack gap="100" align='center'>
                                                        <div className="w-fit">
                                                            <InlineStack gap="200" blockAlign='center' wrap={false}>
                                                                <Icon source={FormsMajor} size="medium" />
                                                                <Text as="p" variant="bodyMd">
                                                                    <b>{data?.pageBars}</b> Page Bars
                                                                </Text>
                                                            </InlineStack>
                                                        </div>
                                                        <div className="w-fit">
                                                            <InlineStack gap="200" blockAlign='center' wrap={false}>
                                                                <Icon source={CustomersMajor} size="medium" />
                                                                <Text as="p" variant="bodyMd">
                                                                    <b>{data?.contacts}</b> Contacts
                                                                </Text>
                                                            </InlineStack>
                                                        </div>
                                                        <div className="w-fit">
                                                            <InlineStack gap="200" blockAlign='center' wrap={false}>
                                                                <Icon source={ViewMajor} size="medium" />
                                                                <Text as="p" variant="bodyMd">
                                                                    <b>{data?.impressions}</b> Impressions
                                                                </Text>
                                                            </InlineStack>
                                                        </div>
                                                        <div className="w-fit">
                                                            <InlineStack gap="200" blockAlign='center' wrap={false}>
                                                                <Icon source={EmailMajor} size="medium" />
                                                                <Text as="p" variant="bodyMd">
                                                                    <b>{data?.emailCompaigns}</b> Email Campaigns
                                                                </Text>
                                                            </InlineStack>
                                                        </div>
                                                        <div className="w-fit">
                                                            <InlineStack gap="200" blockAlign='center' wrap={false}>
                                                                <Icon source={SettingsMinor} size="medium" />
                                                                <Text as="p" variant="bodyMd">
                                                                    <b>{data?.automationsFlows}</b> Automation Flows
                                                                </Text>
                                                            </InlineStack>
                                                        </div>
                                                        <div className="w-fit">
                                                            <InlineStack gap="200" blockAlign='center' wrap={false}>
                                                                <Icon source={ChatMajor} size="medium" />
                                                                <Text as="p" variant="bodyMd">
                                                                    24/7 Customer Support
                                                                </Text>
                                                            </InlineStack>
                                                        </div>
                                                    </BlockStack>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Page>
                    </div>
                )
            }
        </>
    );
}    
