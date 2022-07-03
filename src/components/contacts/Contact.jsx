import React from "react";
import { useSelector } from "react-redux";
import {
  useDeleteContactByIdMutation,
  useGetContactsQuery,
} from "../../utils/api";

const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase().trim();

  return contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.phone.includes(filter)
  );
};
export const Contact = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactByIdMutation();
  const filter = useSelector((state) => state.filter);
  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          {getVisibleContacts(data, filter).map(({ id, name, phone }) => (
            <li key={id}>
              {name} : {phone}
              <button type="button" className="del-button" onClick={() => deleteContact(id)}>
                Delete
              </button>
            </li>
          ))}
        </>
      ) : null}
    </>
  );
};