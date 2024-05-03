import { useContext } from "react";
import {
  Page,
  Banner,
  Text,
} from "@shopify/polaris";
// import { useTranslation } from "react-i18next";
import { AppContext } from "../components/providers";
import Navigation from "../components/Navigation";

export default function AddBar() {
  const { shop, url, isSubscribed } = useContext(AppContext);
  return (
    <>
      {
        isSubscribed ? (
          <div className="container max-w-[1350px] w-full mx-auto">
            <Navigation />
          </div>

        ) : (
          <Page>
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
          </Page>
        )
      }
    </>
  );
}
