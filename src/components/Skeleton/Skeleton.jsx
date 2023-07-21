import ContentLoader from 'react-content-loader'

export default function Skeleton() {
  return (
    <ContentLoader 
    speed={2}
    width={288}
    height={433}
    viewBox="0 0 288 433"
    backgroundColor="#c0c0c0"
    foregroundColor="#80d2c1de"
  >
    <rect x="465" y="63" rx="0" ry="0" width="0" height="1" /> 
    <rect x="1" y="1" rx="10" ry="10" width="288" height="210" /> 
    <rect x="1" y="215" rx="7" ry="7" width="288" height="55" /> 
    <rect x="1" y="274" rx="7" ry="7" width="288" height="55" /> 
    <rect x="1" y="333" rx="7" ry="7" width="288" height="95" />
  </ContentLoader>
  )
}
