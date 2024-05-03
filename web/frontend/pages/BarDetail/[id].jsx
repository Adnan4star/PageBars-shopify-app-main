import {
  Page,
  Button,
  IndexTable,
  Card,
  useIndexResourceState,
  Text,
} from "@shopify/polaris";
// import { useTranslation, Trans } from "react-i18next";
import React, { useState, useEffect, useContext } from "react";
import useApi from '../../components/customhooks/useApi';
import { useAppBridge } from "@shopify/app-bridge-react";
import { AppContext } from "../../components/providers";
import { useParams, useNavigate, useLocation } from "react-router-dom";


export default function BarDetail() {

  const { shop, url } = useContext(AppContext);
  // console.log("from information ", shop);
  const appBridge = useAppBridge()
  const params = useParams();
  const navigate = useNavigate();
  const { callApi, loading, error } = useApi(appBridge, url);
  const [barData, setBarData] = useState([]);
  const location = useLocation();
  const paramss = new URLSearchParams(location.search);
  const barName = paramss.get('name');

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const BarDetail = async () => {
    const response = await callApi("page-bar-detail?id=" + params.id, "GET");
    setBarData(response?.data);
  }

  useEffect(() => {
    BarDetail();
  }, [])

  // const barData = [
  //   {
  //     customer_id: 1,
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     email: 'john.doe@example.com',
  //     phone_number: '123-456-7890',
  //   },
  //   {
  //     customer_id: 2,
  //     first_name: 'Jane',
  //     last_name: 'Smith',
  //     email: 'jane.smith@example.com',
  //     phone_number: '987-654-3210',
  //   },
  //   {
  //     customer_id: 3,
  //     first_name: 'Michael',
  //     last_name: 'Johnson',
  //     email: 'michael.johnson@example.com',
  //     phone_number: '456-789-0123',
  //   },
  //   {
  //     customer_id: 4,
  //     first_name: 'Emily',
  //     last_name: 'Brown',
  //     email: 'emily.brown@example.com',
  //     phone_number: '789-012-3456',
  //   },
  //   {
  //     customer_id: 5,
  //     first_name: 'David',
  //     last_name: 'Taylor',
  //     email: 'david.taylor@example.com',
  //     phone_number: '012-345-6789',
  //   },
  // ];


  const handleExport = async (id) => {
    const response = await callApi(`export?id=${id}`, 'GET');
    // console.log("response is === ", response.link);
    const downloadLink = document.createElement('a');
    downloadLink.href = response?.link;
    downloadLink.download = response?.name;
    downloadLink.target = '_blank';
    downloadLink.click();

  }

  useEffect(() => {
    const noOrdersText = document.querySelector('.Polaris-Text--headingLg');
    const subduedText = document.querySelector('.Polaris-Text--subdued');
    if (noOrdersText) {
      noOrdersText.textContent = 'No leads captured yet';
    }
    if (subduedText) {
      subduedText.textContent = 'It\'s only a matter of time before it happens';

    }
  }, []);

  const rowMarkup = barData?.map(
    ({ customer_id, first_name, last_name, email, phone_number }, index) => (
      <IndexTable.Row
        id={customer_id}
        key={customer_id}
        position={index}
      // Do not pass the selected prop to remove checkboxes
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {first_name} {last_name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" numeric>
            {phone_number}
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );


  return (
    // <div className="flex justify-center">
    //     <div className="max-w-7xl w-[90%]  justify-center">
    <div className="container max-w-[1350px] w-full mx-auto">
      <Page title={barName} fullWidth primaryAction={<Button variant="primary" onClick={() => handleExport(params.id)} >Export</Button>}

        backAction={{ content: 'Add Bars', url: '', onAction: () => navigate('/') }}
      // backAction={{ content: 'Add Bars', url: '' }}
      >
        <Card padding={0}>
          <IndexTable
            // condensed={useBreakpoints().smDown}
            resourceName={resourceName}
            itemCount={barData?.length}
            headings={[
              { title: 'Name' },
              { title: 'Email' },
              { title: 'Phone number' },
            ]}
            selectable={false}
          >
            {rowMarkup}
          </IndexTable>
        </Card>
      </Page>
    </div>
    //     </div>
    // </div>
  );
}
