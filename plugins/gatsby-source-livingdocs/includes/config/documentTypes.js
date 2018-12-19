const documentTypes = {
  page: {
    layoutComponents: {
      layout: 'page-layout',
      header: 'page-layout-header',
      headerItem: 'page-layout-header-item',
      footer: 'page-layout-footer'
    }
  },
  article: {
    layoutComponents: {
      layout: 'article-layout',
      header: 'article-layout-header',
      headerItem: 'article-layout-header-item',
      footer: 'article-layout-footer'
    }
  }
}
const defaultDocumentType = {
  defaultDocumentType: {
    layoutComponents: {
      layout: 'default-layout',
      header: 'default-layout-header',
      headerItem: 'default-layout-header-item',
      footer: 'default-layout-footer'
    }
  }
}

module.exports = {
  documentTypes,
  defaultDocumentType
}
