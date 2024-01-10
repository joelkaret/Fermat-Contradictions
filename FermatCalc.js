const fs = require('fs')
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');

async function FermatCalc(minN, maxN, minAB, maxAB, fileName) {

	for ( let n = minN; n < maxN; n++ ) {
		const nPrBr = new cliProgress.SingleBar({
			format: '{title} |' + colors.magenta('{bar}') + '| {percentage}% || {value}/{total} || {content}',
			barCompleteChar: '\u2588',
			barIncompleteChar: '\u2591',
			hideCursor: true,
			clearOnComplete: false
		});;
		nPrBr.start(maxAB, 0, {title: `n = ${n}`, content: ''});
		let minimum = ['', Infinity]

		for ( let a = minAB; a < maxAB; a++ ) {
			let an = Math.pow(a,n);
			for ( let b = a; b < maxAB; b++ ) {
				let bn = Math.pow(b,n);
				let c = Math.pow(an + bn, 1/n)
				let difference = Math.abs(c - Math.floor(c))
				if ( difference < minimum[1] && b != Math.floor(c)) {
					let error = difference/c
					content = `${a}^${n} + ${b}^${n} = ${c}^${n} ; ${error}%\n`
					minimum = [content, difference]
				}
			}
			nPrBr.update(a)
		}
		await nPrBr.update(maxAB, {content: minimum[0]});
		await nPrBr.stop();
		await fs.appendFileSync(fileName, minimum[0], err => {
			if (err) throw err;
		});
	}
}

FermatCalc(0, 50, 0, 30000, "example.txt")
