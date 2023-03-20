const fs = require('fs');
const path = require('path');

const featurePath = path.join(__dirname, 'features/feature1');

const newFolderName = process.argv[2];

const newFolderPath = path.join(__dirname, `features/${newFolderName}`);

fs.mkdirSync(newFolderPath);

fs.readdirSync(featurePath).forEach(folder => {
	const childFolderPath = path.join(
		__dirname,
		`features/feature1/${folder}`
	);

	const newChildFolderPath = path.join(
		__dirname,
		`features/${newFolderName}/${folder}`
	);

	fs.mkdirSync(newChildFolderPath);

	fs.readdirSync(childFolderPath).forEach(file => {
		const sourceFilePath = path.join(childFolderPath, file);
		const targetFilePath = path.join(newChildFolderPath, file);
		fs.copyFileSync(sourceFilePath, targetFilePath);
	});
});
