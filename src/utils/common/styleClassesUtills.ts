export function classJoiner(...classes: string[]): string{
    if (Array.isArray(classes)){
        return classes.join(' ')
    }

    return classes
}

export function classWatcher(flag:boolean, falseClass:string, trueClass: string, ...defaultClasses:string[]): string{
    return flag ? classJoiner(...defaultClasses, trueClass) : classJoiner(...defaultClasses, falseClass)
}
