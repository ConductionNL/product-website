import * as React from "react";
import * as styles from "./TopNav.module.css";
import { UnorderedList, UnorderedListItem } from "@utrecht/component-library-react/dist/css-module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquare } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "gatsby";
import { useGitHub } from "../../../hooks/resources/gitHub";
import { GitHubLogo } from "../../../assets/svgs/Github";
import { SlackLogo } from "../../../assets/svgs/Slack";
import { ToolTip } from "@conduction/components";
import { TGitHubDirectory, useGitHubDirectories } from "../../../hooks/useGitHubDirectories";

export const TopNav: React.FC = () => {
  const { directories, getSlugFromName } = useGitHubDirectories();

  const [logoUrl, setLogoUrl] = React.useState<string>("");
  React.useEffect(() => {
    setLogoUrl(window.sessionStorage.getItem("NAVBAR_LOGO_URL") ?? "");
  }, []);

  return (
    <nav className={styles.container}>
      <UnorderedList className={styles.list}>
        <section>
          <UnorderedListItem>
            <img className={styles.image} onClick={() => navigate("/")} src={logoUrl} alt={"Navbar-logo"} />
          </UnorderedListItem>

          <UnorderedListItem onClick={() => navigate("/")}>Home</UnorderedListItem>

          {directories?.map((directory, idx) => (
            <UnorderedListItem key={idx} onClick={() => navigate(`/pages/${getSlugFromName(directory.name)}`)}>
              {directory.name}

              <DetailPagesDropDown {...{ directory }} />
            </UnorderedListItem>
          ))}
        </section>

        <section>
          <UnorderedListItem onClick={() => open(window.sessionStorage.getItem("READ_THE_DOCS_URL") ?? "#")}>
            <FontAwesomeIcon icon={faExternalLinkSquare} /> Documentation
          </UnorderedListItem>

          <UnorderedListItem onClick={() => open(window.sessionStorage.getItem("SLACK_URL") ?? "#")}>
            <ToolTip tooltip="Slack">
              <SlackLogo />
            </ToolTip>
          </UnorderedListItem>

          <UnorderedListItem onClick={() => open(window.sessionStorage.getItem("GITHUB_REPOSITORY_URL") ?? "#")}>
            <ToolTip tooltip="Github">
              <GitHubLogo />
            </ToolTip>
          </UnorderedListItem>
        </section>
      </UnorderedList>
    </nav>
  );
};

interface DetailPagesDropDownProps {
  directory: TGitHubDirectory;
}

const DetailPagesDropDown: React.FC<DetailPagesDropDownProps> = ({ directory }) => {
  const { getSlugFromName } = useGitHubDirectories();
  const [detailPages, setDetailPages] = React.useState<any[]>([]);
  const getDetailPages = useGitHub().getDirectoryItems(directory.location);

  React.useEffect(() => {
    if (!getDetailPages.data) return;

    setDetailPages(getDetailPages.data.filter((detailPage) => detailPage.name !== "README"));
  }, [getDetailPages.data]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, target: string) => {
    e.stopPropagation();

    navigate(`/pages/${getSlugFromName(directory.name)}/${target}`);
  };

  if (!detailPages.length) return <></>;

  return (
    <UnorderedList className={styles.dropDownList}>
      {detailPages.map((detailPage, idx) => (
        <UnorderedListItem key={idx} onClick={(e) => handleClick(e, detailPage.href)}>
          {detailPage.name}
        </UnorderedListItem>
      ))}
    </UnorderedList>
  );
};
