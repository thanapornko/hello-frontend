import {
  ContentBox,
  Table,
  EditInput,
  EditIcon,
  DeleteIcon,
  SaveIcon,
  CancelIcon,
  ValidateText
} from "../styles/styledElements";
import { useState, useEffect } from "react";
import validatePersonal from "../validators/validatePersonal";
import Layout from "../layouts/Layout";
import * as adminApi from "../apis/adminApi";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";

export default function UserManagementPage() {
  const [content, setContent] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState({});
  const [selectedRow, setSelectedRow] = useState(-1);
  const { addUser } = useUser();
  const initialInput = {
    firstName: "",
    lastName: "",
    telephone: "",
    idCard: ""
  };
  const [input, setInput] = useState(initialInput);

  useEffect(() => {
    const fetchAllRecord = async () => {
      const res = await adminApi.getAllUser();
      // console.log(res.data?.userInfo, "--content--");
      setContent(res.data?.userInfo);
    };
    fetchAllRecord();
  }, [addUser]);

  const handleInputChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  /// Delete
  const handleDeleteClick = async id => {
    // console.log(id);
    const result = window.confirm(
      "Are you sure to delete this user?"
    );
    if (!result) {
      console.log("cancle!");
      return;
    }
    try {
      await adminApi.deleteUser(id);
      toast.success("Successfully deleted!");
      setContent(content.filter(e => e.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  /// Edit
  const handleEditClick = id => {
    setSelectedRow(id);
    setOpenEdit(true);
    setInput(content[id]);
  };

  /// Cancel
  const handleCancelClick = () => {
    setSelectedRow(-1);
    setOpenEdit(false);
  };

  /// Save
  const handleSaveClick = async (e, id) => {
    try {
      e.preventDefault();
      const result = validatePersonal(input);
      if (result) {
        setError(result);
      } else {
        setError({});
        // console.log(input, "---input---");
        const res = await adminApi.editUser(id, input);
        // console.log(res, "---res---");
        toast.success("Successfully!");
        const updatedContent = content.map(e => {
          console.log("e:", e);
          return e.id === res.data.id ? res.data : e;
        });
        setContent(updatedContent);
        // console.log(content, "---content---");
        setSelectedRow(-1);
        setOpenEdit(false);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "id card is already in use"
      ) {
        setError({
          idCard: "id card is already in use"
        });
      }
    }
  };

  return (
    <Layout>
      <ContentBox>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ID Card</th>
              <th>Telephone</th>
            </tr>
          </thead>
          <tbody>
            {content.map((e, id) => (
              <tr key={id}>
                {selectedRow === id ? (
                  <>
                    <td>
                      <EditInput
                        type="text"
                        name="firstName"
                        value={input.firstName}
                        onChange={handleInputChange}
                      />{" "}
                      <ValidateText>
                        {error?.firstName}
                      </ValidateText>
                    </td>
                    <td>
                      <EditInput
                        type="text"
                        name="lastName"
                        value={input.lastName}
                        onChange={handleInputChange}
                      />
                      <ValidateText>
                        {error?.lastName}
                      </ValidateText>
                    </td>
                    <td>
                      <EditInput
                        type="text"
                        name="idCard"
                        value={input.idCard}
                        onChange={handleInputChange}
                      />{" "}
                      <ValidateText>
                        {error?.idCard}
                      </ValidateText>
                    </td>
                    <td>
                      <EditInput
                        type="text"
                        name="telephone"
                        value={input.telephone}
                        onChange={handleInputChange}
                      />
                      <ValidateText>
                        {error?.telephone}
                      </ValidateText>
                    </td>
                    <td>
                      <SaveIcon
                        className="fa-solid fa-check"
                        onClick={e =>
                          handleSaveClick(e, input.id)
                        }
                      />
                    </td>
                    <td>
                      <CancelIcon
                        className="fa-solid fa-xmark"
                        onClick={handleCancelClick}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{e.firstName}</td>
                    <td>{e.lastName}</td>
                    <td>{e.idCard}</td>
                    <td>{e.telephone}</td>
                    <td>
                      <EditIcon
                        className="fa-solid fa-pen-to-square"
                        onClick={() => handleEditClick(id)}
                      />
                    </td>

                    <td>
                      <DeleteIcon
                        className="fa-solid fa-trash"
                        onClick={() =>
                          handleDeleteClick(e.id)
                        }
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentBox>
    </Layout>
  );
}
