import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (filter.length > 0) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase())
      );
    } else {
      return contacts;
    }
  }
);

export const selectIsLoading = state => state.contacts.loading;

export const selectError = state => state.contacts.error;
