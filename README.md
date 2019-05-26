# bootstrap-react-redux-ssr-ten

## Overview:

App builds off 'bootstrap-react-redux-webpack-ssr-nine'.

=============================================================
=============================================================

Generators & Promises >>> How Babel transforms async code to ES2016 code <<<

Redux-Saga utilizes Generators to Asychonously control Redux (application side effects)

Redux-Saga is a Redux middleware

Redux-Saga is like a separate 'Thred' in a javascript app (opposed to the real 'Thread')

That 'Thred' can be started, paused and cancelled from the main application with normal redux actions

=============================================================
=============================================================

Generators are functions which can be exited and later re-entered

Generator-functions can yield promises

function* gen() {

  const a = yield 1;
  const b = yield true;
  const c = yield 'foo';

  console.log(a, b, c);

}

When a generator function is called, its body is not executed right away. 
Instead it returns an 'iterator-object' which adheres to the 'iterator protocol' (i.e. it has a 'next' method).

The only way to execute the body of 'gen' is by calling the 'next' method on its 'iterator-object'. 
Every time the 'next' method is called, its body is executed until the next 'yield' expression. 
The value of this expression is returned from the iterator.

This 'next' method also accepts an argument. 
Calling it with an argument replaces the current 'yield' expression with the argument and resumes the execution till the next 'yield' expression.

// ------------------------------------

* A generator-function gets executed "yield-by-yield" (i.e. one yield-expression at a time), by its iterator (the 'next' method).

* Every 'yield' has a 'give' >>> 'halt' >>> 'take' behavior, so to say.

* It gives out the value of the current yield-expression, to the iterator.

* It then 'halts' at this point, until the iterator's 'next' method is called again.

* When the 'next' method is called again, it takes the argument from it and replaces the currently halted yield-expression with it. 
  It then moves to the next 'yield'.

// ------------------------------------

how do the generator functions help? 
When applied to a asynchronous flow (waiting for certain tasks to finish before proceeding)


// >>>>>>>>>>> A generator function <<<<<<<<<<<<<<

function* generatorFunction() {

  // >>>>>>>>>>>>> yields a promise for task1 <<<<<<<<<<<<<<<
  const res1 = yield doTask1();

  // >>>>>>>>>>>>> yields a promise for task2 <<<<<<<<<<<<<<<
  const res2 = yield doTask2(res1);

  // >>>>>>>>>>>>> yields a promise for task3 <<<<<<<<<<<<<<<
  const res3 = yield doTask3(res2);

  return res3;
}


// >>>>>>>>>>> A function that executes a generator function <<<<<<<<<<<<<<

function executeGeneratorFunction() {

  const itr = genFn();

  function run(arg) {

    const result = itr.next(arg);

    if (90) {
      return result.value;

    } else {
      return Promise.resolve(result.value).then(run);

    }

  }
  return run();
}


// >>>>>>>>>>> Execute generator function <<<<<<<<<<<<<<

executeGeneratorFunction(generatorFunction);


=============================================================
=============================================================

Manifest Generator for Webpack, with auto icon resizing and fingerprinting support
https://github.com/arthurbergmz/webpack-pwa-manifest

=============================================================
=============================================================

‘access-control-allow-origin'

‘Access-Control-Allow-Headers'

Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.com/feeds. 
(Reason: missing token ‘access-control-allow-origin' in CORS header ‘Access-Control-Allow-Headers' from CORS preflight channel).

Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.com/feeds. (Reason: CORS request did not succeed).

{
  "current_user_url": "https://api.github.com/user",
  "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
  "authorizations_url": "https://api.github.com/authorizations",
  "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
  "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
  "emails_url": "https://api.github.com/user/emails",
  "emojis_url": "https://api.github.com/emojis",
  "events_url": "https://api.github.com/events",
  "feeds_url": "https://api.github.com/feeds",
  "followers_url": "https://api.github.com/user/followers",
  "following_url": "https://api.github.com/user/following{/target}",
  "gists_url": "https://api.github.com/gists{/gist_id}",
  "hub_url": "https://api.github.com/hub",
  "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
  "issues_url": "https://api.github.com/issues",
  "keys_url": "https://api.github.com/user/keys",
  "notifications_url": "https://api.github.com/notifications",
  "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
  "organization_url": "https://api.github.com/orgs/{org}",
  "public_gists_url": "https://api.github.com/gists/public",
  "rate_limit_url": "https://api.github.com/rate_limit",
  "repository_url": "https://api.github.com/repos/{owner}/{repo}",
  "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
  "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
  "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
  "starred_gists_url": "https://api.github.com/gists/starred",
  "team_url": "https://api.github.com/teams",
  "user_url": "https://api.github.com/users/{user}",
  "user_organizations_url": "https://api.github.com/user/orgs",
  "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
  "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
}

