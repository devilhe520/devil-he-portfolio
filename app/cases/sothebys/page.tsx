import CaseOverview from "../../components/CaseOverview";
import { caseOverviews } from "../../data/case-overviews";

export default function SothebysOverview() {
  return <CaseOverview data={caseOverviews.sothebys} />;
}
