import { CardPlaceholder } from "./CardPlaceholder/CardPlaceholder"

export const PlaceholderLoading = () => {
  return (
    <>
      {[...Array(8).keys()].map((i) => (
        <CardPlaceholder />
      ))}
    </>
  )
}