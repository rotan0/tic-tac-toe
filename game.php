<?php
include 'db.php';
header('Content-Type: application/json');

$action = $_POST['action'] ?? '';

if ($action === 'save') {
    $state = $_POST['state'] ?? '';
    $player = $_POST['player'] ?? '';
    $sql = "INSERT INTO games (state, player) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $state, $player);
    $stmt->execute();
    echo json_encode(['success' => true]);
} elseif ($action === 'load') {
    $sql = "SELECT state, player FROM games ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql);
    if ($row = $result->fetch_assoc()) {
        echo json_encode(['state' => $row['state'], 'player' => $row['player']]);
    } else {
        echo json_encode(['state' => '', 'player' => 'X']);
    }
} else {
    echo json_encode(['error' => 'Invalid action']);
}
$conn->close();
?>