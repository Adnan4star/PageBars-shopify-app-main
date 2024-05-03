import {
  Card,
  Page,
  Button,
  Text,
  ProgressBar,
  Banner,
  InlineStack,
  EmptyState,
  Tabs,
  IndexTable,
} from "@shopify/polaris";
import { React, useEffect, useState, useContext, useCallback, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { EditMinor, DeleteMinor, ViewMinor } from '@shopify/polaris-icons';
import PersonFilledIcon from "../assets/PersonFilledIcon.svg";
import ToggleSwitch from "../components/ToggleButton";
import useApi from '../components/customhooks/useApi';
import { useAppBridge } from "@shopify/app-bridge-react";
import { AppContext } from "../components/providers";
import { Frame } from "@shopify/polaris";
import { SkeltonPage, IndexTableSkelton } from '../components/SkeltonPage';
import { Loading } from '@shopify/app-bridge-react';
import { Provider, useToast } from '@shopify/app-bridge-react';
import LimitReachedModal from "../components/LimitReachedModal";
export default function HomePage() {
  const navigate = useNavigate();
  const { shop, url, isSubscribed } = useContext(AppContext);
  const appBridge = useAppBridge();
  const { show } = useToast();
  const { callApi, loading, error } = useApi(appBridge, url);
  const [selected, setSelected] = useState(0);
  const [pageBars, setPageBars] = useState([]);
  const [currentPlan, setCurrentPlan] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const handleNavigation = () => {
    navigate(`/AddBar`);
  };

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
    console.log(" ~ handleTabChange ~ selectedTabIndex:", selectedTabIndex);

    const pageBarsCopy = pageBars.map(bar => ({ ...bar }));

    // console.log(" ~ handleTabChange ~ pageBarsCopy:", pageBarsCopy, pageBars);

    if (selectedTabIndex === 1) {
      const activeBars = pageBarsCopy.filter((bar) => bar.is_active === 1);
      // console.log(" ~ handleTabChange ~ activeBars:", activeBars);
      setPageBars(activeBars);
    } else if (selectedTabIndex === 2) {
      const inactiveBars = pageBarsCopy.filter((bar) => bar.is_active === 0);
      // console.log(" ~ handleTabChange ~ inactiveBars:", inactiveBars);
      setPageBars(inactiveBars);
    }
    else {
      BarDetail()
    }
  }, [pageBars]);

  const handleBarStatusChange = async (id) => {
    const isActive = !pageBars?.find((bar) => bar.id === id).is_active;
    const is_active = isActive ? 1 : 0;
    const response = await callApi(`update-bar-status?id=${id}&is_active=${is_active}`, 'GET');
    // BarDetail();
    if (response?.success) {
      const updatedBars = pageBars.map((bar) => {
        if (bar.id === id) {
          return { ...bar, is_active: isActive };
        }
        return bar;
      });
      setPageBars(updatedBars);
    }
      show(response?.message, { duration: 2000 }, { isError: !response?.success });
    }

    const handleBarDetail = (id, barName) => {
      navigate(`/BarDetail/${id}?name=${barName}`);
    }

    const BarDetail = async () => {
      const response = await callApi("page-bar", 'GET');
      setPageBars(response?.data);
    }
    useEffect(() => {
      BarDetail();
      CurrentPlan();
      // if (!pageBars?.limit) {
      //   setIsModalOpen(true);
      // }
    }, [])

    const CurrentPlan = async () => {
      const response = await callApi(`current-plan`, 'GET');
      // console.log("response is === ", response);
      setCurrentPlan(response);
    }


    const handleBarView = (url) => {
      window.open(url, '_blank'); // '_blank' opens the URL in a new window
    };
    const handleBarDelete = async (id) => {
      const response = await callApi(`delete-data?id=${id}`, 'DELETE');
      // console.log("response is === ", response);
      show(response?.message, { duration: 2000 }, { isError: !response?.success });

      BarDetail();
  }
  
  useEffect(() => {
    if(currentPlan){
     if(currentPlan?.contacts_count > 0 && ( currentPlan?.contacts_count >= currentPlan?.plan?.contacts_count)){
       setIsModalOpen(true);
       setIsLimitReached(true)
     }
    }
  }, [currentPlan])


    const tabs = [
      {
        id: 'all-customers-1',
        content: 'All',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content-1',
      },
      {
        id: 'active',
        content: 'Active',
        panelID: 'accepts-marketing-content-1',
      },
      {
        id: 'inactive',
        content: 'Inactive',
        panelID: 'repeat-customers-content-1',
      },
    ];


    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };

    // const rowMarkup = pageBars?.map(({ id, bar }, index,) => (
    //   <IndexTable.Row id={id} key={id} position={index}>
    //     <IndexTable.Cell>
    //       <Text variant="bodyMd" fontWeight="bold" as="span">
    //         {bar?.bar_name}
    //       </Text>
    //     </IndexTable.Cell>
    //     <IndexTable.Cell>
    //       <span className="flex gap-2 items-center mr-14">
    //         <img src={PersonFilledIcon} className="w-6" />
    //         <Text variant="bodyMd" as="p">
    //           Leads:
    //         </Text>
    //         <Text variant="bodyLg" as="p" fontWeight="bold">
    //           {bar?.leads}
    //         </Text>
    //       </span>
    //     </IndexTable.Cell>
    //     <IndexTable.Cell>
    //       <ToggleSwitch key={bar?.id} checked={bar?.is_active} onChange={() => { handleBarStatusChange(bar?.id) }} round />
    //     </IndexTable.Cell>
    //     <IndexTable.Cell>
    //       <Text as="span" alignment="end" numeric>
    //         <Button icon={EditMinor} size="large" onClick={() => navigate(`/EditBar/${bar?.id}`)}></Button>
    //       </Text>
    //     </IndexTable.Cell>
    //     <IndexTable.Cell>
    //       <Button icon={ViewMinor} size="large" onClick={() => handleBarDetail(bar?.id)}></Button>
    //     </IndexTable.Cell>
    //     <IndexTable.Cell>
    //       <Button icon={DeleteMinor} size="large" onClick={() => handleBarDelete(bar?.id)}></Button>
    //     </IndexTable.Cell>
    //   </IndexTable.Row>
    // ),
    // );


    return (
      <>
        <Frame>
          <LimitReachedModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          {

            isSubscribed ? (
              loading ? (
                <div className="container max-w-[1350px] w-full mx-auto">
                  <Page fullWidth>
                    <IndexTableSkelton />
                    <Loading />
                  </Page>
                </div>
              ) : (
                // <div className="flex justify-center">
                //   <div className="max-w-7xl w-[90%]  justify-center">
                <>
                  <div className="container max-w-[1350px] w-full mx-auto">

                    <Page fullWidth>
                      <Banner
                        title="Page Bars is inactive"
                        action={{ content: 'Enable Page Bars' }}
                        secondaryAction={{ content: 'Learn more', url: '' }}
                        tone="warning"
                      >
                        <Text variant="bodyMd">
                          <b>Enable and save</b> Page Bars in your theme editor.
                        </Text>
                      </Banner>
                    </Page>
                  </div>
                  {
                    pageBars?.length ?
                      (
                        pageBars?.length > 0 ? (
                          <div className="container max-w-[1350px] w-full mx-auto">
                            <Page title="PageBars" fullWidth primaryAction={<Button disabled={isLimitReached} variant="primary" onClick={handleNavigation}> {!pageBars.limit ? 'Add New' : 'Limit Exceed'}</Button>}
                              secondaryActions={<Button>Automations</Button>}
                            >

                              <div className="mb-5 gap-4 flex flex-col">
                                <ProgressBar
                                  progress={((currentPlan?.contacts_count / currentPlan?.plan?.contacts_count) * 100) || 0}
                                  tone="primary"
                                />
                                <InlineStack gap="tight" align="end">
                                  <Text variant="bodyLg" as="p" fontWeight="semibold">
                                    {(currentPlan?.contacts_count / currentPlan?.plan.contacts_count) * 100}% ({currentPlan?.contacts_count} of {currentPlan?.plan.contacts_count} contacts used)
                                  </Text>
                                </InlineStack>
                              </div>
                              <Card padding={'0'}>
                                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                                </Tabs>
                                <div className="PageBars-Table">
                                  <IndexTable
                                    // condensed={useBreakpoints().smDown}
                                    resourceName={resourceName}
                                    itemCount={pageBars?.length}
                                    headings={[
                                      { title: 'Title' },
                                      { title: 'Leads' },
                                      { title: 'Status' },
                                      { title: 'Edit' },
                                      { title: 'View', },
                                      { title: 'Delete' },
                                    ]}
                                    selectable={false}
                                  >
                                    {pageBars?.map(({ id, bar_name, leads, is_active, url }, index,) => (
                                      <IndexTable.Row id={id} key={id} position={index} >
                                        <IndexTable.Cell>
                                          <p className="hover:underline font-semibold cursor-pointer" onClick={() => navigate(`/EditBar/${id}`)}>
                                            {bar_name}
                                          </p>
                                        </IndexTable.Cell>
                                        <IndexTable.Cell>
                                          <span className="flex gap-2 items-center mr-14">
                                            <Button variant="tertiary" size="small" onClick={() => handleBarDetail(id, bar_name)} >
                                              <div className="flex gap-1">
                                                <img src={PersonFilledIcon} className="w-4" />
                                                Leads: {" "} {leads}
                                              </div>
                                              {/* <Text variant="bodySm" as="p">
                                      Leads:
                                    </Text>
                                    <Text variant="bodyMd " as="p" fontWeight="bold">
                                      {leads}
                                    </Text> */}
                                            </Button>
                                          </span>
                                        </IndexTable.Cell>
                                        <IndexTable.Cell>
                                          <ToggleSwitch key={id} checked={is_active} onChange={() => { handleBarStatusChange(id) }} round />
                                        </IndexTable.Cell>
                                        <IndexTable.Cell>
                                          <Text as="span" numeric>
                                            <Button icon={EditMinor} variant="tertiary" size="large" onClick={() => navigate(`/EditBar/${id}`)}></Button>
                                          </Text>
                                        </IndexTable.Cell>
                                        <IndexTable.Cell>
                                          <Button icon={ViewMinor} variant="tertiary" size="large" onClick={() => handleBarView(url)}></Button>
                                        </IndexTable.Cell>
                                        <IndexTable.Cell>
                                          <Button icon={DeleteMinor} variant="tertiary" size="large" onClick={() => handleBarDelete(id)}></Button>
                                        </IndexTable.Cell>
                                      </IndexTable.Row>
                                    ),
                                    )}
                                  </IndexTable>
                                </div>
                              </Card>
                            </Page>
                          </div>
                        ) : (
                          <div className="container max-w-[1350px] w-full mx-auto">
                            <Page fullWidth>
                              <Card sectioned>
                                <EmptyState
                                  heading="Collect leads with Page Bars"
                                  action={{ content: 'Create Page Bar', onAction: () => handleNavigation() }}
                                  image="https://cdn.shopify.com/shopifycloud/forms/bundles/673485334fd6933d971c75c05a87fb59dc33fac41750619592f3767509080c2a.svg"
                                >
                                  <p>Easily Capture and Convert Leads with Customizable Pop-Up Bars and Forms on Your Shopify Store</p>
                                </EmptyState>
                              </Card>
                            </Page>
                          </div>
                        )
                      ) : (
                        <Loading />
                      )
                  }

                </>
                // </div>
                // </div>
              )
            ) : (
              <div className="container max-w-[1350px] w-full mx-auto">
                <Page fullWidth>
                  <Banner
                    title="You are not Subscribed to any page bar plan, subscribe now"
                    action={{ content: 'Subscribe', url: '/BillingPlans' }}
                    secondaryAction={{ content: 'Learn more', url: '' }}
                    tone="warning"
                  >
                    <Text variant="bodyMd">
                      <b>Buy any subscription plan</b> to enjoy all features.
                    </Text>
                  </Banner>
                  {/* <div className="size-96 bg-purple-500"></div> */}
                </Page>
              </div>
            )
          }
        </Frame>
      </>

    );
  }
