const backendAppName = "PromoPlanning300"

const PROXY_CONFIG = {
  [`/${backendAppName}`]: {
    "target": `https://testplan.toolsgroup.com/${backendAppName}/rest/`,
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {[`^/${backendAppName}`] : ""}
   }
}
module.exports = PROXY_CONFIG;