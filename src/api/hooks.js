import { useQuery, useMutation, useQueryClient } from 'react-query';
import { http } from './utils';
import { useStore } from 'store';

const PEOPLE_QUERY = 'people';
const PERSON_QUERY = 'person';

function fetchPeople({ queryKey }) {
  const query = queryKey[1];
  const params = query ? { name_like: query } : undefined;
  return http.get('/people', params);
}

export function useGetPeopleList(query = '') {
  return useQuery([PEOPLE_QUERY, query], fetchPeople);
}

function fetchPerson({ queryKey }) {
  const id = queryKey[1];
  return http.get(`/people/${id}`);
}

export function useGetPerson(id) {
  const queryClient = useQueryClient();

  // If we already loaded the list of people then we have some data about every person.
  // It allows us to show the edit form a bit faster, using available data as a placeholder.
  const people = queryClient.getQueryData([PEOPLE_QUERY, '']);
  const person = people?.find((person) => person.id === id);

  return useQuery([PERSON_QUERY, id], fetchPerson, {
    enabled: id !== undefined,
    placeholderData: person,
  });
}

export function usePrefetchPerson() {
  const queryClient = useQueryClient();

  return async (id) => {
    return await queryClient.prefetchQuery([PERSON_QUERY, id], fetchPerson, {
      staleTime: 10000,
    });
  };
}

function updatePerson(id) {
  return (data) => http.patch(`/people/${id}`, data);
}

export function useUpdatePerson(id) {
  const queryClient = useQueryClient();
  const setFailedMutation = useStore((state) => state.setFailedMutation);

  return useMutation(updatePerson(id), {
    // Optimistic updates arrived.
    // We use the data, submitted by the user to immidiately update people list.
    // We also makes a snapshot of the data before optimistic update to fallback in case of error.
    onMutate: (data) => {
      const people = queryClient.getQueryData([PEOPLE_QUERY, '']);
      const currentIndex = people?.findIndex((person) => person.id === data.id);

      if (currentIndex != null) {
        const peopleCopy = [...people];
        peopleCopy[currentIndex] = data;
        queryClient.setQueryData([PEOPLE_QUERY, ''], peopleCopy);
      }

      const person = queryClient.getQueryData([PERSON_QUERY, data.id]);
      queryClient.setQueryData([PERSON_QUERY, data.id], data);

      return { people, person };
    },
    // If the mutation fails, we use previous snapshot to roll back
    onError: (err, data, context) => {
      setFailedMutation(data);
      queryClient.setQueryData([PEOPLE_QUERY, ''], context.people);
      queryClient.setQueryData([PERSON_QUERY, data.id], context.person);
    },
    // We invalidate cache entries, forcing them to refetch as soon as
    // any component requests the corresponding data next time.
    // It will replace our manual optimistic update with real API data in both success/error cases.
    onSettled: (_, __, data) => {
      queryClient.invalidateQueries([PEOPLE_QUERY]);
      queryClient.invalidateQueries([PERSON_QUERY, data.id]);
    },
  });
}

function addPerson(data) {
  return http.post('/people', data);
}

export function useAddPerson() {
  const queryClient = useQueryClient();
  const setFailedMutation = useStore((state) => state.setFailedMutation);

  return useMutation(addPerson, {
    onMutate: (data) => {
      const people = queryClient.getQueryData([PEOPLE_QUERY, '']);
      queryClient.setQueryData([PEOPLE_QUERY, ''], [...people, data]);
      return { people };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData([PEOPLE_QUERY, ''], context.people);
      setFailedMutation(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries([PEOPLE_QUERY]);
    },
  });
}
