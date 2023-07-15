let user;
function parseJwt (token)
{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c)
    {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }
    ).join(''));
    return JSON.parse(jsonPayload);
}
function experiment(response)
{
    user=parseJwt(response.credential);
    console.log(response);
    console.log(user);
    document.getElementById("g-id-onload").style.visibility="hidden";
}
function indexMain()
{
    google.accounts.id.initialize(
    {
        client_id:"1086134886084-4s87bkdesombd88p143jb62hlb4e2iju.apps.googleusercontent.com",
        callback:experiment
    }
    );
    google.accounts.id.renderButton(document.getElementById("g-id-onload"),{});
}