import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

interface DepartmentType {
  department: string;
  sub_departments: string[] | undefined;
}

function DepartmentList({
  department,
}: {
  department: DepartmentType | undefined;
}) {
  const [listCheck, setListCheck] = useState(false);
  const [subDepartments, setSubDepartments] = useState<boolean[]>([]);
  const [visible,setVisible] = useState(false);
  useEffect(() => {
    if (department?.sub_departments) {
      setSubDepartments(
        new Array(department.sub_departments.length).fill(false)
      );
    }
  }, [department]);

  const handleDeptCheck = () => {
    const newState = !listCheck;
    setListCheck(newState);
    setSubDepartments(new Array(subDepartments.length).fill(newState));
  };

  const handleSubDepartmentClick = (index: number) => {
    setListCheck(false);
    const updatedSubDepartments = [...subDepartments];
    updatedSubDepartments[index] = !updatedSubDepartments[index];
    setSubDepartments(updatedSubDepartments);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 items-center">
        <Checkbox checked={listCheck} onChange={handleDeptCheck} />
        <h2>{department?.department}</h2>
        {!visible && <FontAwesomeIcon icon={faPlus} onClick={()=>setVisible(!visible)}/>}
        {visible && <FontAwesomeIcon icon={faXmark} onClick={()=>setVisible(!visible)}/>}
      </div>
      <div className="flex flex-col gap-2 pl-4">
        {visible&& department?.sub_departments?.map((subDepartment, idx) => (
          <div className="flex flex-row gap-4 items-center" key={idx}>
            <input
              type="checkbox"
              checked={subDepartments[idx]}
              onChange={() => handleSubDepartmentClick(idx)}
            />
            <h3>{subDepartment}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentList;
