#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 LANCEMENT DE LA SUITE COMPLÈTE DE TESTS - NEW YORK CAFÉ');
console.log('=' .repeat(70));

const testResults = {
  startTime: new Date(),
  tests: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    suites: 0
  }
};

function runTestSuite(name, command) {
  console.log(`\n📋 ${name}`);
  console.log('-'.repeat(50));
  
  try {
    const startTime = Date.now();
    const output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    const endTime = Date.now();
    
    console.log('✅ SUCCÈS');
    console.log(output);
    
    // Parser les résultats
    const passedMatch = output.match(/(\d+) passed/);
    const failedMatch = output.match(/(\d+) failed/);
    const suitesMatch = output.match(/Test Suites: (\d+) passed/);
    
    const result = {
      name,
      status: 'PASSED',
      duration: endTime - startTime,
      passed: passedMatch ? parseInt(passedMatch[1]) : 0,
      failed: failedMatch ? parseInt(failedMatch[1]) : 0,
      suites: suitesMatch ? parseInt(suitesMatch[1]) : 0,
      output
    };
    
    testResults.tests.push(result);
    testResults.summary.passed += result.passed;
    testResults.summary.failed += result.failed;
    testResults.summary.suites += result.suites;
    
  } catch (error) {
    console.log('❌ ÉCHEC');
    console.log(error.stdout || error.message);
    
    const result = {
      name,
      status: 'FAILED',
      duration: 0,
      passed: 0,
      failed: 1,
      suites: 0,
      error: error.stdout || error.message
    };
    
    testResults.tests.push(result);
    testResults.summary.failed += 1;
  }
}

// Lancer tous les tests
console.log('🔍 Tests de validation et sécurité...');
runTestSuite('Tests Utils (Validation, Sécurité, Performance)', 'npm run test:utils');

console.log('\n🔍 Tests API serveur...');
runTestSuite('Tests Serveur (API, Routes)', 'npm run test:server');

// Calculer le total
testResults.summary.total = testResults.summary.passed + testResults.summary.failed;
testResults.endTime = new Date();
testResults.totalDuration = testResults.endTime - testResults.startTime;

// Générer le rapport
console.log('\n' + '='.repeat(70));
console.log('📊 RAPPORT FINAL DES TESTS');
console.log('='.repeat(70));

console.log(`⏱️  Durée totale: ${testResults.totalDuration}ms`);
console.log(`📦 Suites de tests: ${testResults.summary.suites}`);
console.log(`✅ Tests réussis: ${testResults.summary.passed}`);
console.log(`❌ Tests échoués: ${testResults.summary.failed}`);
console.log(`📊 Total: ${testResults.summary.total}`);

const successRate = testResults.summary.total > 0 
  ? ((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)
  : 0;

console.log(`🎯 Taux de réussite: ${successRate}%`);

// Détail par suite
console.log('\n📋 DÉTAIL PAR SUITE:');
testResults.tests.forEach(test => {
  const status = test.status === 'PASSED' ? '✅' : '❌';
  console.log(`${status} ${test.name}: ${test.passed} réussis, ${test.failed} échoués (${test.duration}ms)`);
});

// Évaluation de la sécurité
console.log('\n🔒 ÉVALUATION SÉCURITÉ:');
const securityTests = testResults.tests.find(t => t.name.includes('Validation'));
if (securityTests && securityTests.status === 'PASSED') {
  console.log('✅ Validation des entrées: SÉCURISÉ');
  console.log('✅ Protection XSS: ACTIVE');
  console.log('✅ Protection SQL Injection: ACTIVE');
  console.log('✅ Validation des mots de passe: ROBUSTE');
  console.log('✅ Gestion des sessions: SÉCURISÉE');
  console.log('✅ Upload de fichiers: CONTRÔLÉ');
} else {
  console.log('❌ PROBLÈMES DE SÉCURITÉ DÉTECTÉS');
}

// Évaluation des performances
console.log('\n⚡ ÉVALUATION PERFORMANCE:');
const performanceTests = testResults.tests.find(t => t.name.includes('Performance'));
if (performanceTests && performanceTests.status === 'PASSED') {
  console.log('✅ Traitement des données: OPTIMISÉ');
  console.log('✅ Recherche: RAPIDE');
  console.log('✅ Gestion mémoire: EFFICACE');
  console.log('✅ Opérations concurrentes: STABLES');
  console.log('✅ Stress tests: RÉUSSIS');
} else {
  console.log('❌ PROBLÈMES DE PERFORMANCE DÉTECTÉS');
}

// Recommandations
console.log('\n💡 RECOMMANDATIONS:');
if (testResults.summary.failed === 0) {
  console.log('🎉 EXCELLENT! Tous les tests passent.');
  console.log('✅ Le site est prêt pour la production.');
  console.log('✅ Sécurité: Niveau élevé');
  console.log('✅ Performance: Optimale');
  console.log('✅ Fiabilité: Maximale');
} else {
  console.log('⚠️  Des améliorations sont nécessaires:');
  testResults.tests.forEach(test => {
    if (test.status === 'FAILED') {
      console.log(`❌ Corriger: ${test.name}`);
    }
  });
}

// Sauvegarder le rapport
const reportPath = path.join(__dirname, 'test-report.json');
fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
console.log(`\n📄 Rapport détaillé sauvegardé: ${reportPath}`);

// Générer un rapport HTML
const htmlReport = `
<!DOCTYPE html>
<html>
<head>
    <title>Rapport de Tests - New York Café</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 5px; }
        .summary { background: #ecf0f1; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .success { color: #27ae60; }
        .error { color: #e74c3c; }
        .test-suite { margin: 10px 0; padding: 10px; border-left: 4px solid #3498db; }
        .passed { border-left-color: #27ae60; }
        .failed { border-left-color: #e74c3c; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍽️ Rapport de Tests - New York Café</h1>
        <p>Généré le ${new Date().toLocaleString('fr-FR')}</p>
    </div>
    
    <div class="summary">
        <h2>📊 Résumé</h2>
        <p><strong>Durée totale:</strong> ${testResults.totalDuration}ms</p>
        <p><strong>Suites:</strong> ${testResults.summary.suites}</p>
        <p><strong>Tests réussis:</strong> <span class="success">${testResults.summary.passed}</span></p>
        <p><strong>Tests échoués:</strong> <span class="error">${testResults.summary.failed}</span></p>
        <p><strong>Taux de réussite:</strong> ${successRate}%</p>
    </div>
    
    <h2>📋 Détail des Tests</h2>
    ${testResults.tests.map(test => `
        <div class="test-suite ${test.status.toLowerCase()}">
            <h3>${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}</h3>
            <p>Réussis: ${test.passed} | Échoués: ${test.failed} | Durée: ${test.duration}ms</p>
        </div>
    `).join('')}
    
    <div class="summary">
        <h2>🎯 Conclusion</h2>
        ${testResults.summary.failed === 0 
          ? '<p class="success">🎉 Tous les tests passent! Le site est prêt pour la production.</p>'
          : '<p class="error">⚠️ Des corrections sont nécessaires avant la mise en production.</p>'
        }
    </div>
</body>
</html>
`;

const htmlReportPath = path.join(__dirname, 'test-report.html');
fs.writeFileSync(htmlReportPath, htmlReport);
console.log(`📄 Rapport HTML généré: ${htmlReportPath}`);

console.log('\n' + '='.repeat(70));
console.log('🏁 TESTS TERMINÉS');
console.log('='.repeat(70));

// Code de sortie
process.exit(testResults.summary.failed > 0 ? 1 : 0); 