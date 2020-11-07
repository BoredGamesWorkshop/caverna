export function toIdMap<K, V>(values: V[], getKey: (value: V) => K): Map<K, V> {
    return new Map(values.map((value: V) => [getKey(value), value]));
}
