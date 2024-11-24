import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { API_URL, Pagination, ResponseWrapper } from '.';
import { Character } from '@src/types/Character';
import { useMemo } from 'react';

export interface CharacterFilters extends Pagination {
  name?: string;
  gender?: string;
  house?: string;
  bloodStatus?: string;
  species?: string;
}

const fetchCharacters = async (
  filters: CharacterFilters
): Promise<ResponseWrapper<Character[]>> => {
  const params = new URLSearchParams();
  params.append('page[number]', filters.page.toString());
  if (filters.name) params.append('filter[name_cont]', filters.name);
  if (filters.gender) params.append('filter[gender_eq]', filters.gender);
  if (filters.house) params.append('filter[house_eq]', filters.house);
  if (filters.bloodStatus)
    params.append('filter[blood_status_eq]', filters.bloodStatus);
  if (filters.species) params.append('filter[species_eq]', filters.species);
  const response = await fetch(`${API_URL}/characters?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useCharacters = ({ filters }: { filters: CharacterFilters }) => {
  const memoizedFilters = useMemo(() => filters, [filters]);

  return useQuery<ResponseWrapper<Character[]>, Error>({
    queryKey: ['characters', memoizedFilters],
    queryFn: () => fetchCharacters(memoizedFilters),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    placeholderData: keepPreviousData
  });
};
