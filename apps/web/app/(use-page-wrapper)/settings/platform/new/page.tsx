import { withAppDirSsr } from "app/WithAppDirSsr";
import type { PageProps } from "app/_types";
import { _generateMetadata } from "app/_utils";
import { cookies, headers } from "next/headers";

import LicenseRequired from "@calcom/features/ee/common/components/LicenseRequired";

import { buildLegacyCtx } from "@lib/buildLegacyCtx";
import { getServerSideProps } from "@lib/settings/organizations/new/getServerSideProps";

import LegacyPage, { LayoutWrapper } from "~/settings/platform/new/create-new-view";

type Props = {
  isOrg: boolean;
};

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("set_up_your_platform_organization"),
    (t) => t("platform_organization_description"),
    undefined,
    undefined,
    "/settings/platform/new"
  );

const getData = withAppDirSsr<Props>(getServerSideProps);

const ServerPage = async ({ params, searchParams }: PageProps) => {
  await getData(buildLegacyCtx(await headers(), await cookies(), await params, await searchParams));
  return (
    <LayoutWrapper>
      <LicenseRequired>
        <LegacyPage />
      </LicenseRequired>
    </LayoutWrapper>
  );
};

export default ServerPage;
