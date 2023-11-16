import { containerPlugin } from '@vuepress/plugin-container'
import { defaultTheme } from '@vuepress/theme-default'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'

module.exports = {
  lang: 'en-US',
  title: 'Course Full Stack Development - Professional Bachelor Elektronica-ICT',
  description: 'Course Full Stack Development',
  
  theme: defaultTheme({
    logo: '/files/afbeelding1.png',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Organization', link: 'https://www.vives.be' },      
      { text: 'Contact', link: 'mailto:ronny.mees@vives.be' }
    ],
    sidebar: [
      {
        text: 'Development Tools',
        collapsible: true,
        children: [
          '/01_developmenttools/README.md',          
        ]
      },{
        text: 'Introduction',
        collapsible: true,
        children: [
          '/11_history_and_evolution/README.md',
          '/12_tcp_ip_stack/README.md',
          '/13_client_server_model/README.md',
          '/14_web_protocols/README.md',
          '/15_internet_of_things/README.md',
        ]
      },{
        text: 'Frontend Webdesign',
        collapsible: true,
        children: [
          '/21_folder_structure/README.md',
          '/22_webstructure_html/README.md',
          '/23_webstyling_css/README.md',
          '/24_responsive_styling/README.md',
          '/25_online_styles/README.md',
          '/26_deploy_website/README.md',
        ]
      },{
        text: 'Frontend Scripting',
        collapsible: true,
        children: [
          '/31_communication/README.md',
          '/32_frontend_scripting_js/README.md',
          '/35_using_api/README.md',
          '/33_typescript/README.md',
          '/34_advanced_js/README.md',
        ]
      },{
        text: 'Backend databases',
        collapsible: true,
        children: [
          '/41_databases/README.md',
          '/42_setup_mysql/README.md',
          '/43_setup_mariadb/README.md',
          //'/44_install_phpmyadmin/README.md',
          '/45_create_db_user/README.md',
          '/46_crud_db/README.md',
        ]
      },{
        text: 'Backend Scripting',
        collapsible: true,
        children: [
          '/51_intro_express/README.md',
          '/52_rest_api_crud/README.md',
          '/53_rest_api_fileupload/README.md',
          '/54_security/README.md',
        ]
      },{
        text: 'Frontend Development',
        collapsible: true,
        children: [
          '/61_frontend_vue/README.md',
          '/66_routes/README.md',
          '/62_restfull_apis/README.md',
          '/63_crud/README.md',
          '/64_axios/README.md',
          '/65_vuetify/README.md',
        ]
      },{
        text: 'Privacy regulations',
        collapsible: true,
        children: [
          '/73_privacy/README.md',
          //'/72_login/README.md',
          //'/71_secure_api/README.md',          
        ],
      },{
        text: 'Deployment',
        collapsible: true,
        children: [
          '/81_vm/README.md',
          '/82_docker_static/README.md',
          '/83_docker_full/README.md',
          //'/72_login/README.md',
          //'/71_secure_api/README.md',          
        ],
      }
    ],
    sidebarDepth: 1,
    repo: 'https://github.com/ronnymees/fullstackdevelopment_eoict',
    docsDir: 'docs',
    docsBranch: 'master',
  }),
  serviceWorker: true,
  plugins: [
    containerPlugin({
      type: 'codeoutput',
      locales: {
        '/': {
          defaultInfo: 'Output',
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}