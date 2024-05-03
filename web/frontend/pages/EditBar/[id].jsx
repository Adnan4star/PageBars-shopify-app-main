
import { useTranslation, Trans } from "react-i18next";

import EditNavigation from "../../components/EditNavigation";
import { Page } from "@shopify/polaris";
export default function EditBar() {

  const { t } = useTranslation();
  return (
    <div className="container max-w-[1350px] w-full mx-auto">
      <Page fullWidth>
        <EditNavigation />
      </Page>
    </div>
  );
}
