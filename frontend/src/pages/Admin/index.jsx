import NewTask from "./components/NewTask";
import Periods from "./components/Periods";

function Admin() {
  return (
    <div>
      <Periods />
      <NewTask />
      <div>
        {/*
          <ImageUpload />
            input for task title
            imageupload pipa
            dropdown for topics (set topic id)
            dropdown for periods (set period id)
            input for task number (set task number)
            input for task point (set task point)
            save button
          */}
      </div>
    </div>
  );
}

export default Admin;
