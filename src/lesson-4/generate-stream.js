const fs = require('fs');
const { Transform } = require('stream');

const data =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley\n";
const chunkSize = 1024 * 1024; // giới hạn chunk 1MB

// Tạo file nguồn
const writeSourceStream = fs.createWriteStream('src/lesson-4/source.txt');

for (let i = 0; i < 3000000; i++) {
	writeSourceStream.write(data, { highWaterMark: chunkSize });
}
writeSourceStream.end();

writeSourceStream.on('close', () => {
	let totalMemoryUsage = 0;
	const MAX_MEMORY_LIMIT = 512 * 1024 * 1024; // Giới hạn dung lượng file 512MB

	// Hàm biến đổi chunk thành uper case
	const uppercase = new Transform({
		transform(chunk, encoding, callback) {
			totalMemoryUsage += chunk.length;
			if (totalMemoryUsage >= MAX_MEMORY_LIMIT) {
				console.log('Đã đạt đến giới hạn dung lượng file');
			} else {
				callback(null, chunk.toString().toUpperCase());
			}
		}
	});

	const readSourceStream = fs.createReadStream('src/lesson-4/source.txt', {
		highWaterMark: chunkSize
	});
	const writeTargetStream = fs.createWriteStream('src/lesson-4/target.txt', {
		highWaterMark: chunkSize
	});

	// Đọc dữ liệu file nguồn và biến đổi vào file đích
	readSourceStream.pipe(uppercase).pipe(writeTargetStream);

	writeTargetStream.on('finish', () => {
		console.log('File đã được biến đổi');
	});
});
