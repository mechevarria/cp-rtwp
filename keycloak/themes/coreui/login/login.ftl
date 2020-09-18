<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "title">
        ${msg("loginTitle",(realm.displayName!''))}
    <#elseif section = "header">
    <#elseif section = "form">
        <#if realm.password>
            <h1>${msg("loginTitleHtml",(realm.displayNameHtml!''))?no_esc}</h1>
            <p class="text-muted">Sign In to your account</p>
            <form id="kc-form-login" class="${properties.kcFormClass!}" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post" autocomplete="off">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="cil-user"></i> </span>
                  </div>
                    <#if usernameEditDisabled??>
                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" disabled placeholder="Username"/>
                    <#else>
                        <input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="Username"/>
                    </#if>
                </div>

                <div class="input-group mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="cil-lock-locked"></i> </span>
                  </div>
                  <input tabindex="2" id="password" class="${properties.kcInputClass!}" name="password" type="password" autocomplete="off" placeholder="Password"/>
                </div>

                <div class="row">
                    <div class="col-6">
                        <input tabindex="3" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" name="login" id="kc-login" type="submit" value="Login"/>
                    </div>
                    <div class="col-6 text-right">
                        <#if realm.resetPasswordAllowed>
                            <span class="align-middle"><a tabindex="4" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                        </#if>
                    </div>
                </div>

                <div class="${properties.kcFormGroupClass!}">
                    <div id="kc-form-options" class="col-form-label">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="form-check form-check-inline mr-1">
                                <#if login.rememberMe??>
                                    <input tabindex="3" id="rememberMe" class="form-check-input" name="rememberMe" type="checkbox" tabindex="5" checked>
                                <#else>
                                    <input tabindex="3" id="rememberMe" class="form-check-input" name="rememberMe" type="checkbox" tabindex="5">
                                </#if>
                                <label class="form-check-label">${msg("rememberMe")}</label>
                            </div>
                        </#if>
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            
                        </div>
                    </div>
                </div>
            </form>
        </#if>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !usernameEditDisabled??>
            <div id="kc-registration">
                No account?<br>
                <a tabindex="6" class="btn btn-primary active mt-2 mb-2" href="${url.registrationUrl}" role="button">Register Now!</a>
            </div>
            <div class="dropdown-divider"></div>
        </#if>

        <#if realm.password && social.providers??>
            <div id="kc-social-providers">
                <ul>
                    <#list social.providers as p>
                        <li><a href="${p.loginUrl}" id="zocial-${p.alias}" class="zocial ${p.providerId}"> <span class="text">${p.displayName}</span></a></li>
                    </#list>
                </ul>
            </div>
        </#if>
        <p>By logging into this site you accept the usage and privacy terms as a user. If you would like additional information, please visit our
            <a class="font-weight-bold text-white" target="_blank" href="https://www.sap.com/corporate/en/legal/privacy.html" role="button">Privacy Page</a>
        </p>
    </#if>
</@layout.registrationLayout>
