export type Category = {
    _id? : string
    label? : string
    backgroundColor?: string
    textColor?: string
}

export const EmptyCategory: Category = {
    label : "",
    backgroundColor: "#025174",
    textColor: "#ffffff"
}