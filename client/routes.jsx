
FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, {content: <SitesDisplay />});
  }
});

FlowRouter.route('/site/:siteId', {
  name: 'siteDetails',
  action(params) {
    console.log("SiteDetails route:", params.siteId);
    ReactLayout.render(MainLayout, {content: <SiteDetailContainer siteId={params.siteId}/>});
  }
});

