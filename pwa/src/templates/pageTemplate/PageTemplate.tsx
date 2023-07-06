import * as React from "react";
import { Container } from "@conduction/components";
import { useGitHub } from "../../hooks/resources/gitHub";
import { ParsedHTML } from "../../components/ParsedHTML/ParsedHTML";
import { useGitHubDirectories } from "../../hooks/useGitHubDirectories";

interface PageTemplateProps {
  pageSlug: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({ pageSlug }) => {
  const { getDirectoryReadMeLocation } = useGitHubDirectories();

  const getContent = useGitHub().getContent(getDirectoryReadMeLocation(pageSlug));

  return (
    <Container>
      <ParsedHTML contentQuery={getContent} />
    </Container>
  );
};
