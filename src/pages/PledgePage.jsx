import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";

function PledgePage() {
    const { id } = useParams();
    return <PledgeForm projectId={id} />;
}

    export default PledgePage;