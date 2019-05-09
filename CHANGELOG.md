# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [0.3.0](https://github.com/remarkablegames/button-clicker/compare/v0.2.0...v0.3.0) (2019-05-09)


### Features

* add header with message and styles ([1844e0e](https://github.com/remarkablegames/button-clicker/commit/1844e0e))
* set `title` attribute on button so tooltip shows on mouseover ([704aca5](https://github.com/remarkablegames/button-clicker/commit/704aca5))
* **public:** polyfill forEach, Object.keys, document.querySelector ([f07f275](https://github.com/remarkablegames/button-clicker/commit/f07f275))
* **src:** add generators with the same values as Cookie Clicker ([e998336](https://github.com/remarkablegames/button-clicker/commit/e998336))
* **src:** add message to each generator in state.generators ([cc2aa76](https://github.com/remarkablegames/button-clicker/commit/cc2aa76))
* **src:** cache message element and add state.messages ([61cbaa1](https://github.com/remarkablegames/button-clicker/commit/61cbaa1))
* **src:** create views.renderMessage which displays state.messages ([d85b9ac](https://github.com/remarkablegames/button-clicker/commit/d85b9ac))
* **src:** display table column current output before next output ([f429425](https://github.com/remarkablegames/button-clicker/commit/f429425))
* **src:** remove text-align center on td so that it aligns left ([3462f5f](https://github.com/remarkablegames/button-clicker/commit/3462f5f))
* **src:** render message when cursor and generator is purchased ([9a9e4c4](https://github.com/remarkablegames/button-clicker/commit/9a9e4c4))
* **src:** style github-corners and make it fit in header ([0479b3f](https://github.com/remarkablegames/button-clicker/commit/0479b3f))
* **src:** update message in state.generators ([afb4e95](https://github.com/remarkablegames/button-clicker/commit/afb4e95))


### Performance Improvements

* **src:** consolidate generator state update with element creation ([2f27477](https://github.com/remarkablegames/button-clicker/commit/2f27477))



# [0.2.0](https://github.com/remarkablegames/button-clicker/compare/v0.1.0...v0.2.0) (2019-04-12)


### Bug Fixes

* **src:** correct grammar in `formatGeneratorOutput` ([1d5bd1e](https://github.com/remarkablegames/button-clicker/commit/1d5bd1e))


### Features

* rename next output column and add column for current output ([a66609a](https://github.com/remarkablegames/button-clicker/commit/a66609a))
* **src:** add zebra stripes to table to improve readability ([162b0c2](https://github.com/remarkablegames/button-clicker/commit/162b0c2))
* **src:** increase cursor output base from 1 to 2 ([17de33f](https://github.com/remarkablegames/button-clicker/commit/17de33f))



# 0.1.0 (2019-04-02)


### Features

* **public:** add id's to table 97787be
* clone project fom `web-app-template` bd847ca
* **public:** add empty table row for generator e098e52
* **public:** render empty table for store a2eec77
* **src:** add `updateStoreCursor` to actions & update `increment` 3203a40
* **src:** add generator state, view, action, and event handler f90c9c3
* **src:** add onClick listener to store cursor button dc980e5
* **src:** add two more generators to state 25c1ec7
* **src:** convert text and number to locale string 726eb5a
* **src:** increase cursor base cost from 25 to 50 25a0747
* **src:** increment the counter on button click 4889ecf
* **src:** render cursor data in store table 941de7d
* **src:** render heading, counter, and button 477b6a2
* **src:** style the table 1cde418
* **src:** update generators base and rate to improve game balance ca9ad3a
* rename project to `button-clicker` 008cd18


### Performance Improvements

* **src:** add helper `getElementById` that memoizes element node 274a9aa
