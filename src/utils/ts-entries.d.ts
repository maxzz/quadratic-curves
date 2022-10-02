//G: 'typescript entries type'
//https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type 'Typescript Key-Value relation preserving Object.entries type'

type EntriesTuple<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

type PickByValue<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? K : never }[keyof T]>;

type EntriesUnion<T> = {
    [K in keyof T]: [keyof PickByValue<T, T[K]>, T[K]]
}[keyof T][];
