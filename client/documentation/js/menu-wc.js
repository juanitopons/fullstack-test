'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fullstack-test-client</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-606d8481a253db377f891221d7719a37"' : 'data-target="#xs-components-links-module-AppModule-606d8481a253db377f891221d7719a37"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-606d8481a253db377f891221d7719a37"' :
                                            'id="xs-components-links-module-AppModule-606d8481a253db377f891221d7719a37"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-11b4c818c473bb264dfb5a154f6f1b9c"' : 'data-target="#xs-components-links-module-CoreModule-11b4c818c473bb264dfb5a154f6f1b9c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-11b4c818c473bb264dfb5a154f6f1b9c"' :
                                            'id="xs-components-links-module-CoreModule-11b4c818c473bb264dfb5a154f6f1b9c"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToastComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToastComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentModule.html" data-type="entity-link">DepartmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DepartmentModule-fa651ecbcf099c0889a4ea4f46f168b0"' : 'data-target="#xs-components-links-module-DepartmentModule-fa651ecbcf099c0889a4ea4f46f168b0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentModule-fa651ecbcf099c0889a4ea4f46f168b0"' :
                                            'id="xs-components-links-module-DepartmentModule-fa651ecbcf099c0889a4ea4f46f168b0"' }>
                                            <li class="link">
                                                <a href="components/DepartmentListPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentListPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentNewPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentNewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentRoutingModule.html" data-type="entity-link">DepartmentRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link">EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EmployeeModule-c72790de530261ddea0c8fd4f5e9205f"' : 'data-target="#xs-components-links-module-EmployeeModule-c72790de530261ddea0c8fd4f5e9205f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmployeeModule-c72790de530261ddea0c8fd4f5e9205f"' :
                                            'id="xs-components-links-module-EmployeeModule-c72790de530261ddea0c8fd4f5e9205f"' }>
                                            <li class="link">
                                                <a href="components/EmployeeEditPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmployeeEditPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeListPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmployeeListPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmployeeNewPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmployeeNewPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalDeleteComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeRoutingModule.html" data-type="entity-link">EmployeeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-68d64523d4f114eb139e481e7e156a00"' : 'data-target="#xs-components-links-module-SharedModule-68d64523d4f114eb139e481e7e156a00"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-68d64523d4f114eb139e481e7e156a00"' :
                                            'id="xs-components-links-module-SharedModule-68d64523d4f114eb139e481e7e156a00"' }>
                                            <li class="link">
                                                <a href="components/ListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntityModel.html" data-type="entity-link">BaseEntityModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseIdModel.html" data-type="entity-link">BaseIdModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BooleanResponse.html" data-type="entity-link">BooleanResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataSourceSubjData.html" data-type="entity-link">DataSourceSubjData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Department.html" data-type="entity-link">Department</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepartmentsDataSource.html" data-type="entity-link">DepartmentsDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link">Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeesDataSource.html" data-type="entity-link">EmployeesDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityPostRequest.html" data-type="entity-link">EntityPostRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityPutRequest.html" data-type="entity-link">EntityPutRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponse.html" data-type="entity-link">ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelMap.html" data-type="entity-link">ModelMap</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelResponse.html" data-type="entity-link">ModelResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/RawResponse.html" data-type="entity-link">RawResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerResponse.html" data-type="entity-link">ServerResponse</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiService.html" data-type="entity-link">ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentService.html" data-type="entity-link">DepartmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link">EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link">LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link">ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link">UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BooleanResponseData.html" data-type="entity-link">BooleanResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBreadCrumb.html" data-type="entity-link">IBreadCrumb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemAction.html" data-type="entity-link">ItemAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IToast.html" data-type="entity-link">IToast</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListDataSource.html" data-type="entity-link">ListDataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueryOptions.html" data-type="entity-link">QueryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToastOptions.html" data-type="entity-link">ToastOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});