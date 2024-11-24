import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { API_URL, Pagination, ResponseWrapper } from '.';

import { useMemo } from 'react';
import { Spell } from '@src/types/Spells';

export interface SpellsFilters extends Pagination {
  name?: string;
  category?: string;
  creator?: string;
  effect?: string;
  hand?: string;
  incantation?: string;
  light?: string;
}

const fetchSpells = async (
  filters: SpellsFilters
): Promise<ResponseWrapper<Spell[]>> => {
  const params = new URLSearchParams();
  params.append('page[number]', filters.page.toString());
  if (filters.name) params.append('filter[name_cont]', filters.name);
  if (filters.category) params.append('filter[category_eq]', filters.category);
  if (filters.creator) params.append('filter[creator_eq]', filters.creator);
  if (filters.effect) params.append('filter[effect_eq]', filters.effect);
  if (filters.hand) params.append('filter[hand_eq]', filters.hand);
  if (filters.incantation)
    params.append('filter[incantation_eq]', filters.incantation);
  if (filters.light) params.append('filter[light_eq]', filters.light);

  const response = await fetch(`${API_URL}/spells?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useSpells = ({ filters }: { filters: SpellsFilters }) => {
  const memoizedFilters = useMemo(() => filters, [filters]);

  return useQuery<ResponseWrapper<Spell[]>, Error>({
    queryKey: ['spells', memoizedFilters],
    queryFn: () => fetchSpells(memoizedFilters),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    placeholderData: keepPreviousData
  });
};
