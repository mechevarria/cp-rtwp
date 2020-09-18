<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "form">
        <h1>${msg("emailVerifyTitle")}</h1>
        <p class="instruction">
            ${msg("emailVerifyInstruction1")}
        </p>
    <#elseif section = "info" >
        <div class="dropdown-divider"></div>
        ${msg("emailVerifyInstruction2")} <a href="${url.loginAction}" class="font-weight-bold text-white">${msg("doClickHere")}</a> ${msg("emailVerifyInstruction3")}
    </#if>
</@layout.registrationLayout>