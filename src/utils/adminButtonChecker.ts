type CheckType = {
  label: string
}

export function adminButtonChecker<T extends CheckType>(
  items: T[],
  requiredCondition: boolean,
  labels: string[]
): T[] {
  return items.filter(el => {
    return !(labels.includes(el.label) && !requiredCondition);
  })
}
