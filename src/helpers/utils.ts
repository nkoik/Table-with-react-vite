import { Sorting } from "@/enums/table";
import { KeyOfTableList } from "@/types/table";

export const sortList = <T>(list: T[], sortKey: KeyOfTableList<T>, sortDir: `${Sorting}` = Sorting.Ascending): T[] => {
    return list.sort((a, b) => {
        const aValue = String(a[sortKey]);
        const bValue = String(b[sortKey]);

        let comparison = aValue.localeCompare(bValue, undefined, { numeric: true });

        if (sortDir === Sorting.Descending) {
            comparison *= -1;
        }

        return comparison;
    });
}