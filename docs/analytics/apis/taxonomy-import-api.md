---
search:
  exclude: true 
title: Taxonomy Import API
description: The Taxonomy Import API allows you programmatically change your tracking plan in Amplitude Data using CSV files.
---

Taxonomy Import API allows you programmatically change your tracking plan in Amplitude Data using CSV files. 

!!!note

    This document is currently a draft. Amplitude welcomes feedback from the community as we develop this new API.

## Authorization

In order to access Taxonomy Import API you need to use personal access tokens. Please note, these tokens are different from project API keys used in Taxonomy API, see [Amplitude Keys and Tokens Guide](https://www.docs.developers.amplitude.com/guides/amplitude-keys-guide/#keys-overview).

### Personal access tokens

Personal access tokens (also known as API tokens) are an alternative to using passwords for authentication to Amplitude Data when using the Taxonomy API or Ampli CLI. Personal access tokens are used to access Amplitude Data resources on behalf of a user. Each token can access only a single Data project. You can have many of them, and you can revoke access to each one at any time.

#### Create a personal access token

1. Navigate to Amplitude Data's Settings page and open the **API Tokens** section.
2. Click **Create Token** in the upper right corner. 
3. Copy the token. You can't access the token again after you close the modal.

You can also revoke any issued tokens from this page. Just click the three-dot menu next to the token and select **Delete**.

#### Use Personal access token in Taxonomy API

Provide a personal access token along with the GraphQL request in the `Authorization` header with `Bearer` schema. For example:

```bash
POST /graphql HTTP/1.1
Host: data-api.amplitude.com
Content-Type: application/json
Authorization: Bearer {personal-access-token}

query OrgQuery {
  orgs {
    id
  }
}
```

## GraphQL Endpoints

| Region              | Endpoint                                                                               |
|---------------------|----------------------------------------------------------------------------------------|
| Standard Server     | [https://data-api.amplitude.com/graphql](https://data-api.amplitude.com/graphql)       |
| EU Residency Server | [https://data-api.eu.amplitude.com/graphql](https://data-api.eu.amplitude.com/graphql) |

## Tracking plan

Every tracking plan consists of one or more branches and each branch consists of multiple versions. Amplitude creates a branch called `main` by default, and you can create more branches as needed. All versions in each branch are _published_ and immutable except for the _current_ version, which you can modify. To make changes to a tracking plan, you need the ID of the branch you're making changes to and the ID of current version on that branch.

To import taxonomy you should:

1. Retrieve Data workspace's ID and `main` branch's ID
2. Upload CSV file to a separate branch called `import` created off `main` branch
3. Create a new pull request from `import` branch to `main` branch
4. Merge the pull request

The following examples show how to do this.

## Branch GraphQL API

Branch API allows retrieval of the `main` branch's ID and workspace's ID. Workspace name ("Nimbus 2000" in the examples below) represents Data's project name and can be found in the URL when you open the project in Amplitude Data or in the project dropdown in the left sidebar. It's a GraphQL API, so if you're not familiar with GraphQL query and manipulation language check out the [GitHub GraphQL API introduction](https://docs.github.com/en/graphql/guides/introduction-to-graphql).

### Example query

```bash
POST /graphql HTTP/1.1
Host: data-api.amplitude.com
Content-Type: application/json
Authorization: Bearer {personal-access-token}

{
  "query": "query VersionQuery {
    orgs {
      id
      workspaces (name: \"Nimbus 2000\") {
        id
        branches (default: true) {
          id
          name
          currentVersionId
        }
      }
    }
  }"
}
```

### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "f8373034-0073-44e9-ab15-284627d1d7d8",
            "branches": [
              {
                "id": "21311db5-6396-4bbd-92c9-01df946d2a11",
                "name": "main",
                "currentVersionId": "8358649b-2a1d-48fc-852b-64b404cbdc87"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Taxonomy import API REST Endpoints

| Region              | Endpoint                                                                               |
|---------------------|----------------------------------------------------------------------------------------|
| Standard Server     | [https://data-api.amplitude.com/import/csv/](https://data-api.amplitude.com/graphql)       |
| EU Residency Server | [https://data-api.eu.amplitude.com/import/csv/](https://data-api.eu.amplitude.com/graphql) |

## Taxonomy import REST API

To upload a new tracking plan into a separate branch called "import" you need to provide workspace ID and `main` branch ID retrieved from the previous step. Upload file using POST request encoded as `multipart/form-data`, see curl example below:

### Example request

```bash
curl -v -H "Authorization: Bearer {personal-access-token}" \
-F csv=@/Users/amplitude-dev/downloads/my-tracking-plan.csv \
https://data-api.amplitude.com/import/csv/{workspaceId}/{mainBranchId}
```

### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "importType": "stargate",
  "eventCount": 14,
  "templateCount": 0,
  "branchId": "5a8c4928-f090-4244-a5fc-ee856b33fc0d",
  "branchName": "import",
  "currentVersionId": "6c006657-0ee7-43e6-9c1e-97b3ddaada07"
}
```

## Pull request merge GraphQL API

Changes made in `import` (or any other) branch do not affect Analytics until the branch is merged back into the `main` branch. To programmatically merge branches follow a 2-steps process:

1. Create a pull request to merge the `import` branch into the `main` branch
2. Merge the pull request

The following examples show how to do this.

First, create a new pull request. Use branch IDs retrieved from the previous steps instead of branch names, `originBranchId` should contain `import` branch ID, and `targetBranchId` should contain `main` branch ID.

### Example mutation

```bash
POST /graphql HTTP/1.1
Host: data-api.amplitude.com
Content-Type: application/json
Authorization: Bearer {personal-access-token}

{
  "query": "mutation CreatePullRequest($input: CreatePullRequestInput!) {
    createPullRequest(input: $input) {
      id
      status
    }
  }",
  "variables": {
    "input": {
      "workspaceId": "f8373034-0073-44e9-ab15-284627d1d7d8",
      "originBranchId": "5a8c4928-f090-4244-a5fc-ee856b33fc0d",
      "targetBranchId": "21311db5-6396-4bbd-92c9-01df946d2a11",
      "status": "published",
      "description": ""
    }
  }
}
```

### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "createPullRequest": {
      "id": "74508151-4177-472a-9831-81e7027cb9f0",
      "status": "published"
    }
  }
}
```

Use the retrieved pull request ID to merge the pull request. The `import` branch as well as the pull request will be deleted after the merge automatically.

### Example mutation

```bash
POST /graphql HTTP/1.1
Host: data-api.amplitude.com
Content-Type: application/json
Authorization: Bearer {personal-access-token}

{
  "query": "mutation MergePullRequest($input: MergePullRequestInput!) {
    mergePullRequest(input: $input) {
      id
    }
  }",
  "variables": {
    "input": {
      "id": "74508151-4177-472a-9831-81e7027cb9f0",
      "description": ""
    }
  }
}
```

### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "mergePullRequest": {
      "id": "a4a933be-f27b-499e-b79a-95a134ab9cc9"
    }
  }
}
```
