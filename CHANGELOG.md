# Change Log

All notable changes to the "magentodev" extension will be documented in this file.

<!-- Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file. -->

## [0.1.1] - 2024-11-04

### Changed

- Set the default module in the `sequence` node of the `module.xml` file as a comment.

### Fixed

- Wrong content for snippet `layout.container.start-close`.

## [0.1.0] - 2024-11-03

### Added

- Snippet for `layout.xml` files (`layout.block.open-close`, `layout.block.self-closing`, `layout.container.open-close`, `layout.container.self-closing`, `layout.referenceContainer.open-close`, `layout.referenceContainer.self-closing`, `layout.referenceBlock.open-close`, `layout.referenceBlock.self-closing`, `layout.remove`, `layout.move`, `layout.update`).
- Snippet for `events.xml` files (`events.event`).
- Snippets for `di.xml` files (`di.type`, `di.virtualType`, `di.arguments`, `di.plugin`, `di.preference`).
- Automatic content generation for Observers.
- Extension icon.

### Changed

- Update the `CHANGELOG.md` file.
- Generating a layout file now ask for the layout type (can be ignored).
- Show the context menu option `MagentoDev: Override in theme` in explorer only for valid files.

### Fixed

- Typo `Magento Dev` to `MagentoDev` in all files.

### Removed

- Removed `vsc-extension-quickstart.md` file.

## [0.0.5] - 2024-10-30

### Added

- `README.md` file.

## [0.0.4] - 2024-10-30

### Added

- Command `magentodev.reindexAll` to reindex all indexes.
- Explorer context option `magentodev.overrideInTheme` to override a view file in a theme.
- Module indexation.
- Automatic content generation for `layout` files.

### Changed

- Hide the `magentodev.overrideInTheme` command in palette.
- Update module index when creating a new module via the automatic content generation.

### Fixed

- Wrong magento folder detection.

## [0.0.3] - 2024-10-29

### Added

- Theme indexation.
- Output channel to display messages to the user.
- Compatibility with multiple folders workspace.
- Library `php-parser`.
- Prettier configuration file.

### Changed

- Set extension folders to singular instead of plural.

### Fixed

- Issue with where a module is created after the fourth level of the project folder structure.

### Removed

- Editorconfig configuration file.

## [0.0.2] - 2024-10-14

### Added

- Added files creation needed for an empty module when creating a new folder.
- Snippet to create a preference in `di.xml` files.
- Snippet to create a plugin in `di.xml` files.

### Fixed

- Wrongly escaped backslashes in the `registration.php` file generation.
- Editorconfig configuration for `package.json` file.

### Removed

- Command `magentodev.helloWorld`.

## [0.0.1] - 2024-10-14

### Added

- Automatic content generation for `registration.php`.
- Automatic content generation for `module.xml`.
- Automatic content generation for `di.xml`.
- Automatic content generation for `Block` classes.
- Automatic content generation for `Controller` classes.
- Automatic content generation for classes.
- Command `magentodev.helloWorld`.
- Library `xml-js`.
- `editorconfig` configuration file.

[0.1.1]: https://github.com/CyrilLeblanc/vscode-magentodev/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/CyrilLeblanc/vscode-magentodev/compare/v0.0.5...v0.1.0
[0.0.5]: https://github.com/CyrilLeblanc/vscode-magentodev/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/CyrilLeblanc/vscode-magentodev/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/CyrilLeblanc/vscode-magentodev/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/CyrilLeblanc/vscode-magentodev/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/CyrilLeblanc/vscode-magentodev/releases/tag/v0.0.1