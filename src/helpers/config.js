export default{
  ConfigAppUrl : (document.location.hostname==='localhost')?'http://localhost:6501/': (process.env.NODE_ENV==='development')?'http://eroscort.com:6501/':'https://eroscort.com/',
  ConfigSocketUrl : (document.location.hostname==='localhost')?'http://localhost:6500/':(process.env.NODE_ENV==='development')?'http://eroscort.com:6500/':'https://eroscort.com:6500/',
  ConfigNotifications:process.env.REACT_APP_URL_NOTIFICATIONS,
  ConfigApirest   : (document.location.hostname==='localhost')?'https://api.eroscort.com/ApiRest/':(process.env.NODE_ENV==='development')?'https://api.eroscort.com/ApiRest/':'https://api.eroscort.com/ApiRest/',
}
