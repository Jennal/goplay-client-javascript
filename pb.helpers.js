$protobuf = protobuf;

function findProtobuf(name) {
    var root = protobuf.roots["default"];
    for (var key in root) {
        if (root.hasOwnProperty(key)) {
            var element = root[key];
            if (element.hasOwnProperty(name)) {
                return element[name];
            }
        }
    }

    return undefined;
}