import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import Controller from '../../api/controller';

const controller = new Controller();

type useGetMateBoardListProps = {
  matePageNumber: string;
  options?: UseQueryOptions;
};

// export const useMonthTimeLogsQuery = ({ year, month, options }: useMonthTimeLogsProps) => {
//   ...
//   const { data, ...queryInfo } = useQuery(
//     ["timeLogs", year, month],
//     () => getLogsmonth(year, month),
//     ...
//   );

//  ...
// };

export const useGetMateBoardListQuery = ({ matePageNumber, options }: useGetMateBoardListProps) => {

  // return useQuery(["fetch_default"], functionAPI.fetchDefault, {
  //   onSuccess,
  //   onError,
  //   select:data => data.data
  // });

  // return useQuery



  const { data, ...queryInfo } = useQuery({
    queryKey: [`mateBoardList/${matePageNumber}`],
    queryFn: async () => {
      const result = await controller.mateBoardList(matePageNumber);
      return result.data;
    },
  });
  
  return data;
}
